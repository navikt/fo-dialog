import { Aktivitet } from '../utils/aktivitetTypes';
import { aktivitetBasePath } from './UseApiBasePath';
import { sjekkStatuskode } from '../utils/Fetch';
import { Result, Failure, Ok, fail, ok } from '../utils/fetchResult';

const query: string = `
    query($fnr: String!) {
        perioder(fnr: $fnr) {
            id,
            aktiviteter {
                id,
                funksjonellId,
                versjon,
                tittel,
                beskrivelse,
                lenke,
                type,
                status,
                fraDato,
                tilDato,
                opprettetDato,
                endretDato,
                endretAv,
                historisk,
                avsluttetKommentar,
                avtalt,
                forhaandsorientering {
                    id,
                    type,
                    tekst,
                    lestDato,
                }
                endretAvType,
                transaksjonsType,
                malid,
                oppfolgingsperiodeId,

                #   stillingaktivitet
                etikett,
                kontaktperson,
                arbeidsgiver,
                arbeidssted,
                stillingsTittel,

                #    // egenaktivitet
                hensikt,
                oppfolging,

                #    //sokeAvtaleAktivitet
                antallStillingerSokes,
                antallStillingerIUken,
                avtaleOppfolging,

                #    //iJobbAktivitet
                jobbStatus,
                ansettelsesforhold,
                arbeidstid,

                #    //behandlingAktivitet
                behandlingType,
                behandlingSted,
                effekt,
                behandlingOppfolging,

                #    //møte
                adresse,
                forberedelser,
                kanal,
                referat,
                erReferatPublisert,

                stillingFraNavData {
                    cvKanDelesData {
                        kanDeles,
                        endretTidspunkt,
                        endretAv,
                        endretAvType,
                        avtaltDato,
                    }
                    soknadsfrist,
                    svarfrist,
                    arbeidsgiver,
                    bestillingsId,
                    stillingsId,
                    arbeidssted,
                    kontaktpersonData {
                        navn,
                        tittel,
                        mobil,
                    }
                    soknadsstatus,
                    livslopsStatus,
                    varselId,
                    detaljer,
                }

                eksternAktivitet {
                    type,
                    oppgave {
                        ekstern {
                            subtekst,
                            tekst,
                            url
                        }
                        intern {
                            subtekst,
                            tekst,
                            url
                        }
                    }
                    handlinger {
                        url,
                        tekst,
                        subtekst,
                        lenkeType
                    }
                    detaljer {
                        label,
                        verdi
                    }
                    etiketter {
                        tekst,
                        kode,
                        sentiment
                    }
                }
            },
        }
    }
`;
const queryBody = (fnr: string) => ({
    query,
    variables: {
        fnr
    }
});
interface OppfolgingsPerioder {
    id: string;
    aktiviteter: Aktivitet[];
}

interface GraphqlErrorMessage {
    message: string;
}
export interface AktivitetsplanResponse {
    data: {
        perioder: OppfolgingsPerioder[];
    };
    errors: GraphqlErrorMessage[];
}

export class GraphqlError extends Error {
    constructor(errors: GraphqlErrorMessage[]) {
        super(`GraphqlError: ${errors.join(',')}`);
    }
}

const sjekkGraphqlFeil = async (
    result: Result<AktivitetsplanResponse, Error>
): Promise<Result<number, GraphqlError | Error>> => {
    const lal = result.flatMap((result) => {
        if (!result?.data?.perioder && result?.errors.length != 0) {
            return new Failure(new GraphqlError(result.errors));
        }
        return new Ok(result.data);
    });

    // result.flatMap((response) => {
    //     httpSuccess(true);
    // });
    //
    // result.flatMap((test) => {
    //     httpFailure(true);
    // });

    const lol = result.flatMap((response) => {
        if (!response?.data?.perioder && response?.errors.length != 0) {
            const failure2 = fail(new GraphqlError(response.errors));
            const failure = new Failure(new GraphqlError(response.errors));
            return failure;
        }
        const success2 = ok(2);
        const success = new Ok(2);
        return success;
    });
    return lol;
    // if (isOk(result)) {
    //     const response = result.response;
    //     if (!response?.data?.perioder && response?.errors.length != 0) {
    //         return httpFailure(new GraphqlError(response.errors));
    //     }
    //     return httpSuccess(response);
    // } else {
    //     return result;
    // }
};

export const hentAktiviteterGraphql = async (fnr: string | undefined): Promise<AktivitetsplanResponse> => {
    return fetch(`${aktivitetBasePath}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Nav-Consumer-Id': 'arbeidsrettet-dialog'
        },
        body: JSON.stringify(queryBody(fnr || ''))
    })
        .then(sjekkStatuskode)
        .then((it) => it.mapSuccess((res) => res.json()))
        .then(sjekkGraphqlFeil);
};
