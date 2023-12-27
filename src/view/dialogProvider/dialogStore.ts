import { create } from 'zustand';
import { Status } from '../../api/typer';
import { DialogData, SistOppdatert } from '../../utils/Typer';
import { DialogState, isDialogReloading } from '../DialogProvider';
import { fetchData, fnrQuery } from '../../utils/Fetch';
import { DialogApi } from '../../api/UseApiBasePath';
import { isAfter } from 'date-fns';
import { devtools } from 'zustand/middleware';
import { closeWebsocket, listenForNyDialogEvents } from '../../api/nyDialogWs';

export const initDialogState: DialogState = {
    status: Status.INITIAL,
    sistOppdatert: new Date(),
    dialoger: []
};

// - Les
// - Set ferdig
// - Hent dialoger
// - Send melding
// - Ny dialog

type DialogStore = DialogState & {
    silentlyHentDialoger: (fnr: string | undefined) => Promise<void>;
    hentDialoger: (fnr: string | undefined) => Promise<void>;
    pollForChanges: (fnr: string | undefined) => Promise<void>;
    configurePoll(config: { fnr: string | undefined; useWebsockets: boolean; erBruker: boolean }): void;
    updateDialogInDialoger: (dialogData: DialogData) => DialogData;
    stopPolling: () => void;
    pollInterval: NodeJS.Timeout | undefined;
    currentPollFnr: string | undefined;
};

export const useDialogStore = create(
    devtools<DialogStore>(
        (set, get) => ({
            // Data
            // Try to keeep flat datastructure, Zustand "automerges" state on first level only
            ...initDialogState,
            pollInterval: undefined,
            currentPollFnr: undefined,
            // Actions / functions / mutations
            silentlyHentDialoger: async (fnr) => {
                const dialogUrl = DialogApi.hentDialog(fnrQuery(fnr));
                fetchData<DialogData[]>(dialogUrl)
                    .then((dialoger) => {
                        // TODO: Find a way to get previous value
                        // loggChangeInDialog(state.dialoger, dialoger);
                        set(
                            { status: Status.OK, dialoger: dialoger, sistOppdatert: new Date() },
                            false,
                            'hentDialoger/fulfilled'
                        );
                        return dialoger;
                    })
                    .catch((e) => {
                        set(
                            (prevState) => ({ ...prevState, status: Status.ERROR, error: e }),
                            false,
                            'hentDialoger/error'
                        );
                        return [];
                    });
            },
            hentDialoger: async (fnr) => {
                set(
                    (state) => ({ status: isDialogReloading(state.status) ? Status.RELOADING : Status.PENDING }),
                    false,
                    'hentDialoger/pending'
                );
                const { silentlyHentDialoger } = get();
                silentlyHentDialoger(fnr);
            },
            configurePoll({ fnr, useWebsockets, erBruker }) {
                console.log('Configuring poll');
                const { pollForChanges, currentPollFnr } = get();
                // If already polling, don't do anything
                if (!erBruker && currentPollFnr == fnr) {
                    console.log('Already polling');
                    return;
                }
                const pollOnGivenFnr = () => {
                    const interval = onIntervalWithCleanup(() => pollForChanges(fnr));
                    set(
                        () => ({
                            pollInterval: interval
                        }),
                        false,
                        'setPollInterval'
                    );
                };
                if (erBruker) {
                    return pollOnGivenFnr();
                } else {
                    if (useWebsockets) {
                        try {
                            const { silentlyHentDialoger } = get();
                            return listenForNyDialogEvents(() => silentlyHentDialoger(fnr), fnr);
                        } catch (e) {
                            // Fallback to http-polling if anything fails
                            return pollOnGivenFnr();
                        }
                    } else {
                        return pollOnGivenFnr();
                    }
                }
            },
            stopPolling: () => {
                const { pollInterval } = get();
                console.log('Stopping polling with http');
                if (pollInterval) {
                    clearInterval(pollInterval);
                    set(
                        () => ({
                            pollInterval: undefined;
                        }),
                        false,
                        'clearPollInterval'
                    );
                }
                closeWebsocket();
            },
            pollForChanges: async (fnr) => {
                let { sistOppdatert: remoteSistOppdatert } = await fetchData<SistOppdatert>(
                    DialogApi.sistOppdatert(fnrQuery(fnr))
                );
                const { silentlyHentDialoger, sistOppdatert: localSistOppdatert } = get();
                if (!!remoteSistOppdatert && isAfter(remoteSistOppdatert, localSistOppdatert)) {
                    await silentlyHentDialoger(fnr);
                }
            },
            updateDialogInDialoger: (dialog: DialogData): DialogData => {
                set(
                    ({ dialoger }) => {
                        const index = dialoger.findIndex((d) => d.id === dialog.id);
                        const nyeDialoger = [
                            ...dialoger.slice(0, index),
                            dialog,
                            ...dialoger.slice(index + 1, dialoger.length)
                        ];
                        return { status: Status.OK, dialoger: nyeDialoger };
                    },
                    false,
                    'updateDialogInDialoger'
                );
                return dialog;
            }
        }),
        { name: 'DialogStore' }
    )
);

const onIntervalWithCleanup = (pollForChanges: () => Promise<void>) => {
    let interval: NodeJS.Timeout;
    console.log('Setting up polling with http');
    interval = setInterval(() => {
        pollForChanges().catch((e) => {
            console.error(e);
            clearInterval(interval);
        });
    }, 10000);
    return interval;
};
