import { fetchData, fnrQuery } from '../utils/Fetch';
import { DialogData } from '../utils/Typer';

export function nyDialog(fnr: string | undefined, melding: string, tema: string) {
    return sendMelding(fnr, melding, tema);
}

export function nyHenvendelse(fnr: string | undefined, melding: string, dialogId: string) {
    return sendMelding(fnr, melding, undefined, dialogId);
}

function sendMelding(fnr: string | undefined, melding: string, tema?: string, dialogId?: string) {
    const query = fnrQuery(fnr);

    const nyDialogData = {
        dialogId: dialogId,
        overskrift: tema,
        tekst: melding
    };

    return fetchData<DialogData>(`/veilarbdialog/api/dialog/ny${query}`, {
        method: 'post',
        body: JSON.stringify(nyDialogData)
    });
}

export function oppdaterFerdigBehandlet(fnr: string | undefined, dialogId: string, ferdigBehandlet: boolean) {
    const query = fnrQuery(fnr);

    return fetchData<DialogData>(`/veilarbdialog/api/dialog/${dialogId}/ferdigbehandlet/${ferdigBehandlet}${query}`, {
        method: 'put'
    });
}

export function oppdaterVenterPaSvar(fnr: string | undefined, dialogId: string, venterPaSvar: boolean) {
    const query = fnrQuery(fnr);

    return fetchData(`/veilarbdialog/api/dialog/${dialogId}/venter_pa_svar/${venterPaSvar}${query}`, { method: 'put' });
}
