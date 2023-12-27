import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Status } from '../api/typer';
import { DialogApi } from '../api/UseApiBasePath';
import { fetchData, fnrQuery } from '../utils/Fetch';
import { DialogData, NyDialogMeldingData } from '../utils/Typer';
import { initDialogState, useDialogStore } from './dialogProvider/dialogStore';

export const DialogContext = React.createContext<DialogDataProviderType>({
    status: Status.INITIAL,
    nyDialog: (_melding: string, _tema: string, _aktivitetId?: string) => Promise.resolve({} as any),
    nyMelding: (_melding: string, dialog: DialogData) => Promise.resolve(dialog),
    lesDialog: (_dialogId: string) => Promise.resolve({} as any),
    setFerdigBehandlet: (dialog: DialogData, _ferdigBehandlet: boolean) => Promise.resolve(dialog),
    setVenterPaSvar: (dialog: DialogData, _venterPaSvar: boolean) => Promise.resolve(dialog)
});

export const useDialogContext = () => useContext(DialogContext);
export const useDialoger = () => {
    const dialoger = useDialogStore((state) => state.dialoger);
    return dialoger;
};

export interface DialogDataProviderType {
    status: Status;
    nyDialog: (melding: string, tema: string, aktivitetId?: string) => Promise<DialogData>;
    nyMelding: (melding: string, dialog: DialogData) => Promise<DialogData>;
    lesDialog: (dialogId: string) => Promise<DialogData>;
    setFerdigBehandlet: (dialog: DialogData, ferdigBehandlet: boolean) => Promise<DialogData>;
    setVenterPaSvar: (dialog: DialogData, venterPaSvar: boolean) => Promise<DialogData>;
}

export interface DialogState {
    status: Status;
    sistOppdatert: Date;
    dialoger: DialogData[];
    error?: string;
}

export function useDialogDataProvider(fnr?: string): DialogDataProviderType {
    const [state, setState] = useState(initDialogState);

    const updateDialogInDialoger = useDialogStore((state) => state.updateDialogInDialoger);
    const query = fnrQuery(fnr);

    const dialogUrl = useMemo(() => DialogApi.hentDialog(query), [query]);
    const lesUrl = useCallback((id: string) => DialogApi.settLest(id, query), [query]);
    const ferdigBehandletUrl = useCallback(
        (id: string, ferdigBehandlet: boolean) => DialogApi.ferdigBehandlet(id, ferdigBehandlet, query),
        [query]
    );
    const venterPaSvarUrl = useCallback(
        (id: string, venterPaSvar: boolean) => DialogApi.venterPaSvar(id, venterPaSvar, query),
        [query]
    );

    const sendMelding = useCallback(
        (melding: string, tema?: string, dialogId?: string, aktivitetId?: string) => {
            setState((prevState) => ({ ...prevState, status: Status.RELOADING }));

            const nyDialogData: NyDialogMeldingData = {
                dialogId: dialogId,
                overskrift: tema,
                tekst: melding,
                aktivitetId: aktivitetId
            };

            return fetchData<DialogData>(dialogUrl, {
                method: 'post',
                body: JSON.stringify(nyDialogData)
            }).then((dialog) => {
                if (!!dialogId) {
                    updateDialogInDialoger(dialog);
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        status: Status.OK,
                        dialoger: [...prevState.dialoger, dialog]
                    }));
                }
                return dialog;
            });
        },
        [dialogUrl, updateDialogInDialoger]
    );

    const nyDialog = useCallback(
        (melding: string, tema: string, aktivitetId?: string) => {
            return sendMelding(melding, tema, undefined, aktivitetId);
        },
        [sendMelding]
    );

    const nyMelding = useCallback(
        (melding: string, dialog: DialogData) => {
            return sendMelding(melding, undefined, dialog.id);
        },
        [sendMelding]
    );

    const lesDialog = useCallback(
        (dialogId: string) => {
            setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
            return fetchData<DialogData>(lesUrl(dialogId), { method: 'put' }).then(updateDialogInDialoger);
        },
        [lesUrl, updateDialogInDialoger]
    );

    const setFerdigBehandlet = useCallback(
        (dialog: DialogData, ferdigBehandlet: boolean) => {
            setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
            return fetchData<DialogData>(ferdigBehandletUrl(dialog.id, ferdigBehandlet), { method: 'put' }).then(
                updateDialogInDialoger
            );
        },
        [ferdigBehandletUrl, updateDialogInDialoger]
    );

    const setVenterPaSvar = useCallback(
        (dialog: DialogData, venterPaSvar: boolean) => {
            setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
            return fetchData<DialogData>(venterPaSvarUrl(dialog.id, venterPaSvar), { method: 'put' }).then(
                updateDialogInDialoger
            );
        },
        [venterPaSvarUrl, updateDialogInDialoger]
    );

    return useMemo(() => {
        return {
            status: state.status,
            dialoger: state.dialoger,
            nyDialog,
            nyMelding,
            lesDialog,
            setFerdigBehandlet,
            setVenterPaSvar
        };
    }, [state, nyDialog, nyMelding, lesDialog, setFerdigBehandlet, setVenterPaSvar]);
}

export function isDialogReloading(status: Status) {
    return status === Status.OK || status === Status.RELOADING;
}

export function isDialogPending(status: Status) {
    return status === Status.PENDING;
}

export function hasDialogError(status: Status) {
    return status === Status.ERROR;
}
