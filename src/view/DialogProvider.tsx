import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Status } from '../api/typer';
import { DialogApi } from '../api/UseApiBasePath';
import { fetchData, fnrQuery } from '../utils/Fetch';
import { DialogData, NyDialogMeldingData } from '../utils/Typer';
import { initDialogState, useDialogStore } from './dialogProvider/dialogStore';

export const DialogContext = React.createContext<DialogDataProviderType>({
    status: Status.INITIAL,
    nyDialog: (args) => Promise.resolve({} as any),
    nyMelding: ({ dialog }: NyMeldingArgs) => Promise.resolve(dialog),
    lesDialog: (_dialogId: string) => Promise.resolve({} as any),
    setFerdigBehandlet: (dialog: DialogData, _ferdigBehandlet: boolean) => Promise.resolve(dialog),
    setVenterPaSvar: (dialog: DialogData, _venterPaSvar: boolean) => Promise.resolve(dialog)
});

export const useDialogContext = () => useContext(DialogContext);
export const useDialoger = () => {
    const dialoger = useDialogStore((state) => state.dialoger);
    return dialoger;
};

export interface NyTradArgs {
    melding: string;
    tema: string;
    aktivitetId: string | undefined;
    fnr: string | undefined;
}
export interface NyMeldingArgs {
    melding: string;
    dialog: DialogData;
    fnr: string | undefined;
}
interface SendMeldingArgs {
    tekst: string;
    overskrift?: string;
    dialogId?: string;
    aktivitetId?: string;
    fnr?: string;
}

export interface DialogDataProviderType {
    status: Status;
    nyDialog: (args: NyTradArgs) => Promise<DialogData>;
    nyMelding: (args: NyMeldingArgs) => Promise<DialogData>;
    lesDialog: (dialogId: string, fnr: string | undefined) => Promise<DialogData>;
    setFerdigBehandlet: (dialog: DialogData, ferdigBehandlet: boolean, fnr: string | undefined) => Promise<DialogData>;
    setVenterPaSvar: (dialog: DialogData, venterPaSvar: boolean, fnr: string | undefined) => Promise<DialogData>;
}

export interface DialogState {
    status: Status;
    sistOppdatert: Date;
    dialoger: DialogData[];
    error?: string;
}

const dialogUrl = DialogApi.opprettDialog;
const lesUrl = ({ id }: { id: string }) => DialogApi.settLest(id);
const ferdigBehandletUrl = ({ ferdigBehandlet, id }: { id: string; ferdigBehandlet: boolean }) =>
    DialogApi.ferdigBehandlet(id, ferdigBehandlet);
const venterPaSvarUrl = ({ fnr, id, venterPaSvar }: { id: string; venterPaSvar: boolean; fnr: string | undefined }) =>
    DialogApi.venterPaSvar(id, venterPaSvar, fnrQuery(fnr));

export function useDialogDataProvider(): DialogDataProviderType {
    const [state, setState] = useState(initDialogState);

    const updateDialogInDialoger = useDialogStore((state) => state.updateDialogInDialoger);
    const setOkStatus = () => setState((prevState) => ({ ...prevState, status: Status.OK }));

    const sendMelding = ({ dialogId, overskrift, tekst, aktivitetId, fnr }: SendMeldingArgs) => {
        setState((prevState) => ({ ...prevState, status: Status.RELOADING }));

        const nyDialogData: NyDialogMeldingData = {
            dialogId,
            overskrift,
            tekst,
            aktivitetId,
            fnr
        };

        return fetchData<DialogData>(dialogUrl, {
            method: 'post',
            body: JSON.stringify(nyDialogData)
        }).then((dialog) => {
            if (!!dialogId) {
                updateDialogInDialoger(dialog);
                setOkStatus();
            } else {
                setState((prevState) => ({
                    ...prevState,
                    status: Status.OK,
                    dialoger: [...prevState.dialoger, dialog]
                }));
            }
            return dialog;
        });
    };

    const nyDialog = ({ melding, tema, aktivitetId, fnr }: NyTradArgs) => {
        return sendMelding({ tekst: melding, overskrift: tema, dialogId: undefined, aktivitetId, fnr });
    };

    const nyMelding = ({ melding, fnr, dialog }: NyMeldingArgs) => {
        return sendMelding({ tekst: melding, dialogId: dialog.id, fnr });
    };

    const lesDialog = (dialogId: string) => {
        setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
        return fetchData<DialogData>(lesUrl({ id: dialogId }), { method: 'put' }).then((dialogData) => {
            setOkStatus();
            return updateDialogInDialoger(dialogData);
        });
    };

    const setFerdigBehandlet = (dialog: DialogData, ferdigBehandlet: boolean, fnr: string | undefined) => {
        setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
        return fetchData<DialogData>(ferdigBehandletUrl({ id: dialog.id, ferdigBehandlet }), {
            method: 'put'
        }).then((dialogData) => {
            setOkStatus();
            return updateDialogInDialoger(dialogData);
        });
    };

    const setVenterPaSvar = (dialog: DialogData, venterPaSvar: boolean, fnr: string | undefined) => {
        setState((prevState) => ({ ...prevState, status: Status.RELOADING }));
        return fetchData<DialogData>(venterPaSvarUrl({ id: dialog.id, venterPaSvar, fnr }), { method: 'put' }).then(
            (dialogData) => {
                setOkStatus();
                return updateDialogInDialoger(dialogData);
            }
        );
    };

    return {
        status: state.status,
        nyDialog,
        nyMelding,
        lesDialog,
        setFerdigBehandlet,
        setVenterPaSvar
    };
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
