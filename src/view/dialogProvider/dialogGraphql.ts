import { DialogApi } from '../../api/UseApiBasePath';
import { sjekkStatuskode, toJson } from '../../utils/Fetch';
import { DialogData, KladdData } from '../../utils/Typer';

const query = `
    query($fnr: String!, $bareMedAktiviteter: Boolean) {
        dialoger(fnr: $fnr, bareMedAktiviteter: $bareMedAktiviteter) {
            id,
            aktivitetId,
            overskrift,
            sisteTekst,
            sisteDato,
            opprettetDato,
            oppfolgingsperiode,
            historisk,
            lest,
            venterPaSvar,
            ferdigBehandlet,
            lestAvBrukerTidspunkt,
            erLestAvBruker,
            oppfolgingsperiode,
            egenskaper,
            henvendelser {
                id,
                lest,
                avsender,
                avsenderId,
                dialogId,
                sendt,
                tekst
            }
        },
        kladder(fnr: $fnr) {
            aktivitetId,
            dialogId,
            tekst,
            overskrift
        }
    }
`;

const queryBody = (fnr: string) => ({
    query,
    variables: {
        fnr,
        bareMedAktiviteter: false
    }
});

interface GraphqlError {
    message: string;
}

export interface GraphqlResponse<T> {
    data: T;
    errors: GraphqlError[];
}

const sjekkGraphqlFeil = <T>(response: GraphqlResponse<T>): Promise<GraphqlResponse<T>> => {
    if ((response?.errors?.length || 0) != 0) {
        return Promise.reject('Kunne ikke hente dialoger');
    }
    return Promise.resolve(response);
};

export const hentDialogerGraphql = async (
    fnr: string | undefined
): Promise<{ dialoger: DialogData[]; kladder: KladdData[] }> => {
    return fetch(DialogApi.graphql, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Nav-Consumer-Id': 'arbeidsrettet-dialog'
        },
        body: JSON.stringify(queryBody(fnr || ''))
    })
        .then(sjekkStatuskode)
        .then(toJson)
        .then(sjekkGraphqlFeil<{ dialoger: DialogData[]; kladder: KladdData[] }>)
        .then((response) => response.data);
};
