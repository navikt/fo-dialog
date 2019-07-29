import { DialogData, HenvendelseData, NyDialogMeldingData } from '../utils/typer';
import { rndId } from './utils';
import { JSONArray, JSONObject, ResponseData } from 'yet-another-fetch-mock';
import bruker from './bruker';

const dialoger: DialogData[] & JSONArray = [];

export function lesDialog(dialogId: string): Promise<ResponseData> {
    const dialog = dialoger.find(dialog => dialog.id === dialogId);
    if (dialog) {
        dialog.lest = true;
        return Promise.resolve({ status: 200 });
    }
    return Promise.resolve({ status: 404 });
}

export function opprettEllerOppdaterDialog(update: NyDialogMeldingData): DialogData & JSONObject {
    const dialogId = !update.dialogId || update.dialogId === '' ? rndId() : `${update.dialogId}`;
    const nyHenvendelse: HenvendelseData = {
        id: rndId(),
        dialogId: dialogId,
        avsender: 'BRUKER',
        avsenderId: 'Z123456',
        sendt: new Date().toISOString(),
        lest: true,
        tekst: update.tekst
    };

    const eksisterendeDialog = dialoger.find(dialog => update.dialogId !== undefined && dialog.id === dialogId);

    if (eksisterendeDialog) {
        const oldDialog = eksisterendeDialog;
        oldDialog.sisteTekst = update.tekst;
        oldDialog.sisteDato = nyHenvendelse.sendt;
        oldDialog.henvendelser.push(nyHenvendelse);

        if (!bruker.erVeileder) {
            oldDialog.venterPaSvar = false;
        }

        return oldDialog as DialogData & JSONObject;
    } else {
        const nyDialog: DialogData = {
            id: nyHenvendelse.dialogId,
            overskrift:
                update.overskrift === undefined || update.overskrift === null ? rndId().toString() : update.overskrift,
            sisteTekst: update.tekst,
            sisteDato: new Date().toISOString(),
            opprettetDato: new Date().toISOString(),
            historisk: false,
            lest: true,
            venterPaSvar: false,
            ferdigBehandlet: true,
            lestAvBrukerTidspunkt: null,
            erLestAvBruker: false,
            aktivitetId: null,
            henvendelser: [nyHenvendelse],
            egenskaper: []
        };
        dialoger.push(nyDialog);
        return nyDialog as DialogData & JSONObject;
    }
}

export function setVenterPaSvar(dialogId: string, venterPaSvar: boolean) {
    const dialog = dialoger.find(dialog => dialog.id === dialogId);
    if (dialog) {
        dialog.venterPaSvar = venterPaSvar;
    }
    return dialog as DialogData & JSONObject;
}

export function setFerdigBehandlet(dialogId: string, ferdigBehandlet: boolean) {
    const dialog = dialoger.find(dialog => dialog.id === dialogId);
    if (dialog) {
        dialog.ferdigBehandlet = ferdigBehandlet;
    }
    return dialog as DialogData & JSONObject;
}
export default dialoger;
