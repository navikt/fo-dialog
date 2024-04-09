import { Aktivitet } from '../utils/aktivitetTypes';
import { aktivitetBasePath } from './UseApiBasePath';
import { sjekkStatuskode } from '../utils/Fetch';

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

interface GraphqlError {
    message: string;
}
export interface AktivitetsplanResponse {
    data: {
        perioder: OppfolgingsPerioder[];
    };
    errors: GraphqlError[];
}

const sjekkGraphqlFeil = (response: AktivitetsplanResponse): Promise<AktivitetsplanResponse> => {
    if (!response?.data?.perioder && response?.errors.length != 0) {
        return Promise.reject('Kunne ikke hente aktiviteter');
    }
    return Promise.resolve(response);
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
        .then((it) => it.json())
        .then(sjekkGraphqlFeil);
};
