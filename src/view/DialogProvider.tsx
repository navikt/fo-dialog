import { isAfter } from 'date-fns';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Status } from '../api/typer';
import { loggChangeInDialog } from '../felleskomponenter/logging';
import { fetchData, fnrQuery } from '../utils/Fetch';
import { DialogData, NyDialogMeldingData, SistOppdatert } from '../utils/Typer';
import useApiBasePath from '../utils/UseApiBasePath';

export interface DialogDataProviderType {
    status: Status;
    dialoger: DialogData[];
    hentDialoger: () => Promise<DialogData[]>;
    pollForChanges: () => Promise<void>;
    nyDialog: (melding: string, tema: string, aktivitetId?: string) => Promise<DialogData>;
    nyHenvendelse: (melding: string, dialog: DialogData) => Promise<DialogData>;
    lesDialog: (dialogId: string) => Promise<DialogData>;
    setFerdigBehandlet: (dialog: DialogData, ferdigBehandlet: boolean) => Promise<DialogData>;
    setVenterPaSvar: (dialog: DialogData, venterPaSvar: boolean) => Promise<DialogData>;
}

export const DialogContext = React.createContext<DialogDataProviderType>({
    status: Status.INITIAL,
    dialoger: [],
    hentDialoger: () => Promise.resolve([]),
    pollForChanges: () => Promise.resolve(),
    nyDialog: (_melding: string, _tema: string, _aktivitetId?: string) => Promise.resolve({} as any),
    nyHenvendelse: (_melding: string, dialog: DialogData) => Promise.resolve(dialog),
    lesDialog: (_dialogId: string) => Promise.resolve({} as any),
    setFerdigBehandlet: (dialog: DialogData, _ferdigBehandlet: boolean) => Promise.resolve(dialog),
    setVenterPaSvar: (dialog: DialogData, _venterPaSvar: boolean) => Promise.resolve(dialog)
});

export const useDialogContext = () => useContext(DialogContext);

export interface DialogState {
    status: Status;
    sistOppdatert: Date;
    dialoger: DialogData[];
    error?: string;
}

const initDialogState: DialogState = {
    status: Status.INITIAL,
    sistOppdatert: new Date(),
    dialoger: []
};

export function useDialogDataProvider(fnr?: string): DialogDataProviderType {
    const [state, setState] = useState(initDialogState);
    const sistOppdatert = state.sistOppdatert;

    const apiBasePath = useApiBasePath();
    const query = fnrQuery(fnr);

    const baseUrl = useMemo(() => `${apiBasePath}/veilarbdialog/api/dialog${query}`, [apiBasePath, query]);
    const sistOppdatertUrl = useMemo(
        () => `${apiBasePath}/veilarbdialog/api/dialog/sistOppdatert${query}`,
        [apiBasePath, query]
    );
    const lesUrl = useCallback(
        (id: string) => `${apiBasePath}/veilarbdialog/api/dialog/${id}/les${query}`,
        [apiBasePath, query]
    );
    const ferdigBehandletUrl = useCallback(
        (id: string, ferdigBehandlet: boolean) =>
            `${apiBasePath}/veilarbdialog/api/dialog/${id}/ferdigbehandlet/${ferdigBehandlet}${query}`,
        [apiBasePath, query]
    );
    const venterPaSvarUrl = useCallback(
        (id: string, venterPaSvar: boolean) =>
            `${apiBasePath}/veilarbdialog/api/dialog/${id}/venter_pa_svar/${venterPaSvar}${query}`,
        [apiBasePath, query]
    );

    const hentDialoger: () => Promise<DialogData[]> = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isDialogReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<DialogData[]>(baseUrl)
            .then((dialoger) => {
                setState({ status: Status.OK, dialoger: dialoger, sistOppdatert: new Date() });
                return dialoger;
            })
            .catch((e) => {
                console.log(`hentDialoger: e:${e}`);
                setState((prevState) => ({ ...prevState, status: Status.ERROR, error: e }));
                return [];
            });
    }, [baseUrl, setState]);

    const pollForChanges = useCallback(() => {
        return fetchData<SistOppdatert>(sistOppdatertUrl).then((data) => {
            if (!!data.sistOppdatert) {
                if (isAfter(data.sistOppdatert, sistOppdatert)) {
                    fetchData<DialogData[]>(baseUrl).then((dialoger) => {
                        setState((prevState) => {
                            loggChangeInDialog(prevState.dialoger, dialoger);
                            return { status: Status.OK, dialoger: dialoger, sistOppdatert: new Date() };
                        });
                    });
                }
            }
        });
    }, [baseUrl, sistOppdatertUrl, setState, sistOppdatert]);

    const updateDialogInDialoger = useCallback(
        (dialog: DialogData) => {
            setState((prevState) => {
                const dialoger = prevState.dialoger;
                const index = dialoger.findIndex((d) => d.id === dialog.id);
                const nyeDialoger = [
                    ...dialoger.slice(0, index),
                    dialog,
                    ...dialoger.slice(index + 1, dialoger.length)
                ];
                return { ...prevState, status: Status.OK, dialoger: nyeDialoger };
            });
            return dialog;
        },
        [setState]
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

            return fetchData<DialogData>(baseUrl, {
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
        [setState, baseUrl, updateDialogInDialoger]
    );

    const nyDialog = useCallback(
        (melding: string, tema: string, aktivitetId?: string) => {
            return sendMelding(melding, tema, undefined, aktivitetId);
        },
        [sendMelding]
    );

    const nyHenvendelse = useCallback(
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
        [setState, lesUrl, updateDialogInDialoger]
    );

    const setFerdigBehandlet = useCallback(
        (dialog: DialogData, ferdigBehandlet: boolean) => {
            setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
            return fetchData<DialogData>(ferdigBehandletUrl(dialog.id, ferdigBehandlet), { method: 'put' }).then(
                updateDialogInDialoger
            );
        },
        [setState, ferdigBehandletUrl, updateDialogInDialoger]
    );

    const setVenterPaSvar = useCallback(
        (dialog: DialogData, venterPaSvar: boolean) => {
            setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
            return fetchData<DialogData>(venterPaSvarUrl(dialog.id, venterPaSvar), { method: 'put' }).then(
                updateDialogInDialoger
            );
        },
        [setState, venterPaSvarUrl, updateDialogInDialoger]
    );

    return useMemo(() => {
        return {
            status: state.status,
            dialoger: state.dialoger,
            hentDialoger,
            pollForChanges,
            nyDialog,
            nyHenvendelse,
            lesDialog,
            setFerdigBehandlet,
            setVenterPaSvar
        };
    }, [state, hentDialoger, pollForChanges, nyDialog, nyHenvendelse, lesDialog, setFerdigBehandlet, setVenterPaSvar]);
}

function isDialogReloading(status: Status) {
    return status === Status.OK || status === Status.RELOADING;
}

export function isDialogOk(status: Status) {
    return status === Status.OK;
}

export function isDialogPending(status: Status) {
    return status === Status.PENDING;
}

export function isDialogPendingOrReloading(status: Status) {
    return status === Status.PENDING || status === Status.RELOADING;
}

export function hasDialogError(status: Status) {
    return status === Status.ERROR;
}
