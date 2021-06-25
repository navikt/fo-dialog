import { JSONObject } from 'yet-another-fetch-mock';

const moteAktivitet = {
    adresse: 'Nordre strandvei 56',
    ansettelsesforhold: null,
    antallStillingerIUken: null,
    antallStillingerSokes: null,
    arbeidsgiver: null,
    arbeidssted: null,
    arbeidstid: null,
    avsluttetKommentar: null,
    avtaleOppfolging: null,
    avtalt: false,
    behandlingOppfolging: null,
    behandlingSted: null,
    behandlingType: null,
    beskrivelse: 'Vi ønsker å snakke med deg om aktiviteter du har gjennomført og videre oppfølging.',
    effekt: null,
    endretAv: null,
    endretDato: '2019-10-11T10:15:12.652+02:00',
    erReferatPublisert: true,
    etikett: null,
    forberedelser: null,
    fraDato: '2019-10-10T07:15:00+02:00',
    hensikt: null,
    historisk: false,
    id: 'MOTE1',
    jobbStatus: null,
    kanal: 'OPPMOTE',
    kontaktperson: null,
    lagtInnAv: 'NAV',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-10-11T10:14:54.777+02:00',
    referat: 'aasdasdas',
    status: 'PLANLAGT',
    stillingsTittel: null,
    tilDato: '2019-10-10T07:45:00+02:00',
    tittel: 'Møte med nav med tittel som er så utrolig lang at den kan jo umulig få plass uansett hvor stor skjerm man har',
    transaksjonsType: 'REFERAT_PUBLISERT',
    type: 'MOTE',
    versjon: '213019'
};
const stilingAktivitet = {
    adresse: null,
    ansettelsesforhold: null,
    antallStillingerIUken: null,
    antallStillingerSokes: null,
    arbeidsgiver: 'NAV IKT',
    arbeidssted: 'Sannergata',
    arbeidstid: null,
    avsluttetKommentar: null,
    avtaleOppfolging: null,
    avtalt: true,
    behandlingOppfolging: null,
    behandlingSted: null,
    behandlingType: null,
    beskrivelse: 'Tralala',
    effekt: null,
    endretAv: '1571400374040',
    endretDato: '2019-10-18T12:06:14.040Z',
    erReferatPublisert: false,
    etikett: 'AVSLAG',
    forberedelser: null,
    fraDato: '2019-10-17T22:00:00.000Z',
    hensikt: null,
    historisk: false,
    id: 'STILLING1',
    jobbStatus: null,
    kanal: null,
    kontaktperson: 'Ole Duck',
    lagtInnAv: 'BRUKER',
    lenke: 'www.nav.no',
    oppfolging: null,
    opprettetDato: '2019-10-18T12:06:14.040Z',
    referat: null,
    status: 'PLANLAGT',
    stillingsTittel: null,
    tilDato: '2019-10-25T10:00:00.000Z',
    tittel: 'Utvikler',
    transaksjonsType: null,
    type: 'STILLING',
    versjon: '1',
    malid: null
};
const samtalereferatAktivitet = {
    adresse: null,
    ansettelsesforhold: null,
    antallStillingerIUken: null,
    antallStillingerSokes: null,
    arbeidsgiver: null,
    arbeidssted: null,
    arbeidstid: null,
    avsluttetKommentar: null,
    avtaleOppfolging: null,
    avtalt: false,
    behandlingOppfolging: null,
    behandlingSted: null,
    behandlingType: null,
    beskrivelse: null,
    effekt: null,
    endretAv: null,
    endretDato: '2019-10-15T10:42:30.656+02:00',
    erReferatPublisert: true,
    etikett: null,
    forberedelser: null,
    fraDato: '2019-10-10T07:15:00+02:00',
    hensikt: null,
    historisk: false,
    id: 'SAMTALEREFERAT1',
    jobbStatus: null,
    kanal: 'TELEFON',
    kontaktperson: null,
    lagtInnAv: 'NAV',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-10-15T09:51:27.372+02:00',
    referat:
        'Vi ble enige om at det skal søkes https://www.nav.no/en/veldig/lang/url/som/skal/ende/opp/med/ellipse minst 5 stillinger i uken den første perioden',
    status: 'BRUKER_ER_INTERESSERT',
    stillingsTittel: null,
    tilDato: null,
    tittel: 'Samtale om søkekrav',
    transaksjonsType: 'REFERAT_ENDRET',
    type: 'SAMTALEREFERAT',
    versjon: '213394'
};
const behandlingAktivitet = {
    adresse: null,
    ansettelsesforhold: null,
    antallStillingerIUken: null,
    antallStillingerSokes: null,
    arbeidsgiver: null,
    arbeidssted: null,
    arbeidstid: null,
    avsluttetKommentar: null,
    avtaleOppfolging: null,
    avtalt: true,
    behandlingOppfolging: null,
    behandlingSted: 'gfds',
    behandlingType: 'doktor',
    beskrivelse: null,
    effekt: null,
    endretAv: null,
    endretDato: '2019-10-15T10:06:58.932+02:00',
    erReferatPublisert: false,
    etikett: null,
    forberedelser: null,
    fraDato: '2019-09-19T12:00:00+02:00',
    hensikt: null,
    historisk: false,
    id: 'BEHANDLING1',
    jobbStatus: null,
    kanal: null,
    kontaktperson: null,
    lagtInnAv: 'NAV',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-10-15T10:06:48.82+02:00',
    referat: null,
    status: 'BRUKER_ER_INTERESSERT',
    stillingsTittel: null,
    tilDato: '2019-09-19T12:00:00+02:00',
    tittel: 'Avtale hos kiropraktor',
    transaksjonsType: 'STATUS_ENDRET',
    type: 'BEHANDLING',
    versjon: '213381'
};
const sokeavtaleAktivitet = {
    adresse: null,
    ansettelsesforhold: null,
    antallStillingerIUken: 0,
    antallStillingerSokes: 4,
    arbeidsgiver: null,
    arbeidssted: null,
    arbeidstid: null,
    avsluttetKommentar: null,
    avtaleOppfolging: null,
    avtalt: true,
    behandlingOppfolging: null,
    behandlingSted: null,
    behandlingType: null,
    beskrivelse:
        'NAV forventer at du søker omtrent 20 stillinger i denne perioden. Det er viktig at du søker på de jobbene du mener du er kvalifisert for. Det er også viktig å søke på mange stillinger, det øker sjansene dine til å finne en jobb.',
    effekt: null,
    endretAv: null,
    endretDato: '2019-09-18T09:33:00.062+02:00',
    erReferatPublisert: false,
    etikett: null,
    forberedelser: null,
    fraDato: '2019-08-28T12:43:32.241+02:00',
    hensikt: null,
    historisk: false,
    id: 'SOKEAVTALE1',
    jobbStatus: null,
    kanal: null,
    kontaktperson: null,
    lagtInnAv: 'BRUKER',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-08-28T12:43:42.63+02:00',
    referat: null,
    status: 'PLANLAGT',
    stillingsTittel: null,
    tilDato: '2019-11-28T11:43:32.241+01:00',
    tittel: 'Avtale om å søke jobber',
    transaksjonsType: 'STATUS_ENDRET',
    type: 'SOKEAVTALE',
    versjon: '210092'
};
const sokeavtaleAktivitet2 = {
    adresse: null,
    ansettelsesforhold: null,
    antallStillingerIUken: 5,
    antallStillingerSokes: 0,
    arbeidsgiver: null,
    arbeidssted: null,
    arbeidstid: null,
    avsluttetKommentar: null,
    avtaleOppfolging: null,
    avtalt: true,
    behandlingOppfolging: null,
    behandlingSted: null,
    behandlingType: null,
    beskrivelse:
        'NAV forventer at du søker omtrent 20 stillinger i denne perioden. Det er viktig at du søker på de jobbene du mener du er kvalifisert for. Det er også viktig å søke på mange stillinger, det øker sjansene dine til å finne en jobb.',
    effekt: null,
    endretAv: null,
    endretDato: '2019-09-18T09:33:00.062+02:00',
    erReferatPublisert: false,
    etikett: null,
    forberedelser: null,
    fraDato: '2019-08-28T12:43:32.241+02:00',
    hensikt: null,
    historisk: false,
    id: 'SOKEAVTALE2',
    jobbStatus: null,
    kanal: null,
    kontaktperson: null,
    lagtInnAv: 'BRUKER',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-08-28T12:43:42.63+02:00',
    referat: null,
    status: 'PLANLAGT',
    stillingsTittel: null,
    tilDato: '2019-11-28T11:43:32.241+01:00',
    tittel: 'Avtale om å søke jobber',
    transaksjonsType: 'STATUS_ENDRET',
    type: 'SOKEAVTALE',
    versjon: '210092'
};
const ijobbAktivitet = {
    adresse: null,
    ansettelsesforhold: null,
    antallStillingerIUken: null,
    antallStillingerSokes: null,
    arbeidsgiver: null,
    arbeidssted: null,
    arbeidstid: null,
    avsluttetKommentar: null,
    avtaleOppfolging: null,
    avtalt: false,
    behandlingOppfolging: null,
    behandlingSted: null,
    behandlingType: null,
    beskrivelse: null,
    effekt: null,
    endretAv: null,
    endretDato: '2019-09-18T09:26:30.607+02:00',
    erReferatPublisert: false,
    etikett: null,
    forberedelser: null,
    fraDato: '2019-08-14T00:00:00+02:00',
    hensikt: null,
    historisk: false,
    id: 'IJOBB1',
    jobbStatus: 'DELTID',
    kanal: null,
    kontaktperson: null,
    lagtInnAv: 'BRUKER',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-08-15T15:31:01.874+02:00',
    referat: null,
    status: 'PLANLAGT',
    stillingsTittel: null,
    tilDato: '2019-08-20T00:00:00+02:00',
    tittel: 'LALALA',
    transaksjonsType: 'STATUS_ENDRET',
    type: 'IJOBB',
    versjon: '210077'
};

const aktiviteter = {
    aktiviteter: [
        moteAktivitet,
        stilingAktivitet,
        samtalereferatAktivitet,
        behandlingAktivitet,
        sokeavtaleAktivitet,
        sokeavtaleAktivitet2,
        ijobbAktivitet
    ]
};

export function getAktivitet(id: string): JSONObject {
    const aktivitet = aktiviteter.aktiviteter.find((aktivitet) => aktivitet.id === id);
    return aktivitet ? aktivitet : {};
}

export default aktiviteter;
