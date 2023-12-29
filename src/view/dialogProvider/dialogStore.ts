import { create } from 'zustand';
import { Status } from '../../api/typer';
import { DialogData } from '../../utils/Typer';
import { fetchData, fnrQuery } from '../../utils/Fetch';
import { DialogApi } from '../../api/UseApiBasePath';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { HentDialogRequestState, asyncThunk, sliceReducer } from './storeUtils';
import { PollSlice, pollSlice } from './pollStore';

export const initDialogState: DialogRequestStore = {
    hentDialog: {
        status: Status.INITIAL,
        data: { dialoger: [], sistOppdatert: new Date() },
        error: undefined
    }
};

// - Les
// - Set ferdig
// - Hent dialoger
// - Send melding
// - Ny dialog

// State as in not actions
export interface DialogRequestStore {
    hentDialog: HentDialogRequestState;
}

export type DialogStore = DialogRequestStore &
    PollSlice & {
        silentlyHentDialoger: (
            fnr: string | undefined
        ) => Promise<{ dialoger: DialogData[]; sistOppdatert: Date | undefined }>;
        hentDialoger: (fnr: string | undefined) => Promise<void>;
        updateDialogInDialoger: (dialogData: DialogData) => DialogData;
        pollInterval: NodeJS.Timeout | undefined;
        currentPollFnr: string | undefined;
    };

export const useDialogStore = create(
    devtools<DialogStore>(
        (set, get) => ({
            ...pollSlice(set, get),
            // Data
            // Try to keeep flat datastructure, Zustand "automerges" state on first level only
            ...initDialogState,
            pollInterval: undefined,
            currentPollFnr: undefined,
            // Actions / functions / mutations
            silentlyHentDialoger: async (fnr) => {
                const dialogUrl = DialogApi.hentDialog(fnrQuery(fnr));
                return fetchData<DialogData[]>(dialogUrl).then((dialoger) => {
                    // TODO: Find a way to get previous value
                    // loggChangeInDialog(state.dialoger, dialoger);
                    return { dialoger, sistOppdatert: new Date() };
                });
            },
            hentDialoger: async (fnr) => {
                const { silentlyHentDialoger } = get();
                const reducer = sliceReducer(set, 'hentDialog');
                asyncThunk(reducer, () => silentlyHentDialoger(fnr), 'hentDialoger');
            },
            updateDialogInDialoger: (dialog: DialogData): DialogData => {
                set(
                    (prevState: DialogStore) => {
                        const dialoger = prevState.hentDialog.data.dialoger;
                        const index = dialoger.findIndex((d) => d.id === dialog.id);
                        const nyeDialoger = [
                            ...dialoger.slice(0, index),
                            dialog,
                            ...dialoger.slice(index + 1, dialoger.length)
                        ];
                        return {
                            ...prevState,
                            hentDialog: {
                                ...prevState.hentDialog,
                                status: Status.OK,
                                data: { dialoger: nyeDialoger, sistOppdatert: new Date() },
                                error: undefined
                            }
                        };
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

export const useHentDialoger = () => useDialogStore(useShallow((store) => store.hentDialoger));
