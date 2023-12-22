import { create } from 'zustand';
import { Status } from '../../api/typer';
import { DialogData, SistOppdatert } from '../../utils/Typer';
import { DialogState, isDialogReloading } from '../DialogProvider';
import { fetchData, fnrQuery } from '../../utils/Fetch';
import { DialogApi } from '../../api/UseApiBasePath';
import { isAfter } from 'date-fns';
import { devtools } from 'zustand/middleware';

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
};

export const useDialogStore = create<DialogStore>((set, get) => ({
    // Data
    // Try to keeep flat datastructure, Zustand "automerges" state on first level
    ...initDialogState,
    // Actions / functions / mutations
    silentlyHentDialoger: async (fnr) => {
        const dialogUrl = DialogApi.hentDialog(fnrQuery(fnr));
        fetchData<DialogData[]>(dialogUrl)
            .then((dialoger) => {
                // TODO: Find a way to get previous value
                // loggChangeInDialog(state.dialoger, dialoger);
                set({ status: Status.OK, dialoger: dialoger, sistOppdatert: new Date() });
                return dialoger;
            })
            .catch((e) => {
                set((prevState) => ({ ...prevState, status: Status.ERROR, error: e }));
                return [];
            });
    },
    hentDialoger: async (fnr) => {
        set((state) => ({ status: isDialogReloading(state.status) ? Status.RELOADING : Status.PENDING }));
        const { silentlyHentDialoger } = get();
        silentlyHentDialoger(fnr);
    },
    pollForChanges: async (fnr) => {
        let { sistOppdatert: remoteSistOppdatert } = await fetchData<SistOppdatert>(
            DialogApi.sistOppdatert(fnrQuery(fnr))
        );
        const { silentlyHentDialoger, sistOppdatert: localSistOppdatert } = get();
        if (!!remoteSistOppdatert && isAfter(remoteSistOppdatert, localSistOppdatert)) {
            await silentlyHentDialoger(fnr);
        }
    }
}));
