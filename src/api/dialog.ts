import { fetchData, fnrQuery } from '../utils/Fetch';
import { DialogData } from '../utils/Typer';
import { baseApiPath } from '../utils/UseApiBasePath';

export function nyDialog(fnr: string | undefined, melding: string, tema: string, aktivitetId?: string) {
    return sendMelding(fnr, melding, tema, undefined, aktivitetId);
}

export function nyHenvendelse(fnr: string | undefined, melding: string, dialogId: string) {
    return sendMelding(fnr, melding, undefined, dialogId);
}

function sendMelding(fnr: string | undefined, melding: string, tema?: string, dialogId?: string, aktivitetId?: string) {
    const query = fnrQuery(fnr);
    const apiBasePath = baseApiPath(fnr);

    const nyDialogData = {
        dialogId: dialogId,
        overskrift: tema,
        tekst: melding,
        aktivitetId: aktivitetId
    };

    return fetchData<DialogData>(`${apiBasePath}/veilarbdialog/api/dialog${query}`, {
        method: 'post',
        body: JSON.stringify(nyDialogData)
    });
}

export function oppdaterFerdigBehandlet(fnr: string | undefined, dialogId: string, ferdigBehandlet: boolean) {
    const query = fnrQuery(fnr);
    const apiBasePath = baseApiPath(fnr);

    return fetchData<DialogData>(
        `${apiBasePath}/veilarbdialog/api/dialog/${dialogId}/ferdigbehandlet/${ferdigBehandlet}${query}`,
        {
            method: 'put'
        }
    );
}

export function oppdaterVenterPaSvar(fnr: string | undefined, dialogId: string, venterPaSvar: boolean) {
    const query = fnrQuery(fnr);
    const apiBasePath = baseApiPath(fnr);

    return fetchData(`${apiBasePath}/veilarbdialog/api/dialog/${dialogId}/venter_pa_svar/${venterPaSvar}${query}`, {
        method: 'put'
    });
}
