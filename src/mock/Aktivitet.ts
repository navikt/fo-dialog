import {
    Aktivitet,
    AktivitetStatus,
    AktivitetTypes,
    EksternAktivitetTypes,
    KanalTypes,
    StillingFraNavSoknadsstatus
} from '../utils/aktivitetTypes';
import oppfolging from './Oppfolging';

const gjeldendeOppfolgingsPeriode = oppfolging.oppfolgingsPerioder.find((periode) => !periode.sluttDato) || {
    uuid: '1'
};

export const moteAktivitet: Aktivitet = {
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
    kanal: KanalTypes.OPPMOTE,
    kontaktperson: null,
    endretAvType: 'NAV',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-10-11T10:14:54.777+02:00',
    referat: 'aasdasdas',
    status: AktivitetStatus.PLANLAGT,
    stillingsTittel: null,
    tilDato: '2019-10-10T07:45:00+02:00',
    tittel: 'Møte med nav med tittel som er så utrolig lang at den kan jo umulig få plass uansett hvor stor skjerm man har',
    transaksjonsType: 'REFERAT_PUBLISERT',
    type: AktivitetTypes.MOTE,
    versjon: '213019',
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
};
export const stilingAktivitet: Aktivitet = {
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
    kanal: undefined,
    kontaktperson: 'Ole Duck',
    endretAvType: 'BRUKER',
    lenke: 'www.nav.no',
    oppfolging: null,
    opprettetDato: '2019-10-18T12:06:14.040Z',
    referat: null,
    status: AktivitetStatus.PLANLAGT,
    stillingsTittel: null,
    tilDato: '2019-10-25T10:00:00.000Z',
    tittel: 'Utvikler',
    transaksjonsType: null,
    type: AktivitetTypes.STILLING,
    versjon: '1',
    malid: null,
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
};
export const samtalereferatAktivitet: Aktivitet = {
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
    kanal: KanalTypes.TELEFON,
    kontaktperson: null,
    endretAvType: 'NAV',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-10-15T09:51:27.372+02:00',
    referat:
        'Vi ble enige om at det skal søkes https://www.nav.no/en/veldig/lang/url/som/skal/ende/opp/med/ellipse minst 5 stillinger i uken den første perioden',
    status: AktivitetStatus.BRUKER_ER_INTERESSERT,
    stillingsTittel: null,
    tilDato: null,
    tittel: 'Samtale om søkekrav',
    transaksjonsType: 'REFERAT_ENDRET',
    type: AktivitetTypes.SAMTALEREFERAT,
    versjon: '213394',
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
};
export const behandlingAktivitet: Aktivitet = {
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
    kanal: undefined,
    kontaktperson: null,
    endretAvType: 'NAV',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-10-15T10:06:48.82+02:00',
    referat: null,
    status: AktivitetStatus.BRUKER_ER_INTERESSERT,
    stillingsTittel: null,
    tilDato: '2019-09-19T12:00:00+02:00',
    tittel: 'Avtale hos kiropraktor',
    transaksjonsType: 'STATUS_ENDRET',
    type: AktivitetTypes.BEHANDLING,
    versjon: '213381',
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
};
export const sokeavtaleAktivitet: Aktivitet = {
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
        'Nav forventer at du søker omtrent 20 stillinger i denne perioden. Det er viktig at du søker på de jobbene du mener du er kvalifisert for. Det er også viktig å søke på mange stillinger, det øker sjansene dine til å finne en jobb.',
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
    kanal: undefined,
    kontaktperson: null,
    endretAvType: 'BRUKER',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-08-28T12:43:42.63+02:00',
    referat: null,
    status: AktivitetStatus.PLANLAGT,
    stillingsTittel: null,
    tilDato: '2019-11-28T11:43:32.241+01:00',
    tittel: 'Avtale om å søke jobber',
    transaksjonsType: 'STATUS_ENDRET',
    type: AktivitetTypes.SOKEAVTALE,
    versjon: '210092',
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
};
const sokeavtaleAktivitet2: Aktivitet = {
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
        'Nav forventer at du søker omtrent 20 stillinger i denne perioden. Det er viktig at du søker på de jobbene du mener du er kvalifisert for. Det er også viktig å søke på mange stillinger, det øker sjansene dine til å finne en jobb.',
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
    kanal: undefined,
    kontaktperson: null,
    endretAvType: 'BRUKER',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-08-28T12:43:42.63+02:00',
    referat: null,
    status: AktivitetStatus.PLANLAGT,
    stillingsTittel: null,
    tilDato: '2019-11-28T11:43:32.241+01:00',
    tittel: 'Avtale om å søke jobber',
    transaksjonsType: 'STATUS_ENDRET',
    type: AktivitetTypes.SOKEAVTALE,
    versjon: '210092',
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
};
export const ijobbAktivitet: Aktivitet = {
    adresse: null,
    ansettelsesforhold: 'Gode arbeidsforhold',
    antallStillingerIUken: null,
    antallStillingerSokes: null,
    arbeidsgiver: null,
    arbeidssted: null,
    arbeidstid: 'arbeidstid midt på dagen',
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
    kanal: undefined,
    kontaktperson: null,
    endretAvType: 'BRUKER',
    lenke: null,
    malid: null,
    oppfolging: null,
    opprettetDato: '2019-08-15T15:31:01.874+02:00',
    referat: null,
    status: AktivitetStatus.PLANLAGT,
    stillingsTittel: null,
    tilDato: '2019-08-20T00:00:00+02:00',
    tittel: 'LALALA',
    transaksjonsType: 'STATUS_ENDRET',
    type: AktivitetTypes.IJOBB,
    versjon: '210077',
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
};
export const stillingFraNav: Aktivitet = {
    versjon: '5345437',
    id: 'STILLING_FRA_NAV_1',
    tittel: 'Servitør',
    type: AktivitetTypes.STILLING_FRA_NAV,
    lenke: null,
    status: AktivitetStatus.PLANLAGT,
    opprettetDato: '2020-05-31T10:46:51.622+01:00',
    endretDato: '2018-09-30T10:46:51.622+01:00',
    endretAv: 'z990207',
    historisk: false,
    kontaktperson: 'Vidar Vidarsen,\n Nav-ansatt, 99 99 99 99,vidar.vidarsen@nav.no',
    endretAvType: 'NAV',
    transaksjonsType: 'OPPRETTET',
    stillingFraNavData: {
        cvKanDelesData: {
            avtaltDato: null,
            endretAv: 'Meg',
            endretAvType: 'NAV',
            endretTidspunkt: null,
            kanDeles: true
        },
        arbeidsgiver: 'Havsalt AS',
        arbeidssted: 'Kristiansand',
        lenke: 'www.nav.no',
        svarfrist: '2021-07-29T10:46:51.622+01:00',
        bestillingsId: '1',
        soknadsfrist: 'adss',
        soknadsstatus: StillingFraNavSoknadsstatus.VENTER,
        stillingsId: '2',
        varselId: '3'
        // kontaktpersonData: {
        //     navn: 'Sykfest Strutle',
        //     tittel: 'NAV-ansatt',
        //     mobil: null
        // }
    },
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
} as Aktivitet;
const stillingFraNav2: Aktivitet = {
    versjon: '5345436',
    id: 'STILLING_FRA_NAV_2',
    tittel: 'Hovmester',
    type: AktivitetTypes.STILLING_FRA_NAV,
    lenke: null,
    status: AktivitetStatus.GJENNOMFORES,
    opprettetDato: '2020-05-31T10:46:51.622+01:00',
    endretDato: '2020-09-30T10:46:51.622+01:00',
    endretAv: 'z990207',
    historisk: false,
    kontaktperson: 'Vidar Vidarsen,\n Nav-ansatt, 99 99 99 99,vidar.vidarsen@nav.no',
    endretAvType: 'NAV',
    transaksjonsType: 'STATUS_ENDRET',
    stillingFraNavData: {
        cvKanDelesData: {
            avtaltDato: '2020-09-30T10:46:51.622+01:00',
            kanDeles: true,
            endretTidspunkt: '2020-09-30T10:46:51.622+01:00',
            endretAv: 'V123',
            endretAvType: 'BRUKER'
        },
        arbeidsgiver: 'Havsalt AS',
        arbeidssted: 'Kristiansand',
        lenke: 'www.nav.no',
        soknadsstatus: StillingFraNavSoknadsstatus.VENTER,
        varselId: '1',
        stillingsId: '2',
        bestillingsId: '3',
        soknadsfrist: '2020-09-30T10:46:51.622+01:00',
        svarfrist: '2020-09-30T10:46:51.622+01:00'
    },
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
} as Aktivitet;
export const midl_lonnstilsk = {
    versjon: '5345436',
    id: 'EKSTERNAKTIVITET_1',
    tittel: 'Baker Jonson',
    type: AktivitetTypes.EKSTERN_AKTIVITET,
    fraDato: '2019-08-14T00:00:00+02:00',
    lenke: null,
    beskrivelse: 'Ekstern aktivitet https://www.lol.no/?redirect=https://lol.no beskrivelse aaaaa aaaa aa.',
    status: AktivitetStatus.GJENNOMFORES,
    opprettetDato: '2020-05-31T10:46:51.622+01:00',
    endretDato: '2020-09-30T10:46:51.622+01:00',
    endretAv: 'z990207',
    historisk: false,
    endretAvType: 'NAV',
    transaksjonsType: 'STATUS_ENDRET',
    eksternAktivitet: {
        type: EksternAktivitetTypes.MIDLERTIDIG_LONNSTILSKUDD
    },
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
} as Aktivitet;
const varig_lonnstilsk = {
    versjon: '5345436',
    id: 'EKSTERNAKTIVITET_2',
    tittel: 'Maler Hansson',
    type: AktivitetTypes.EKSTERN_AKTIVITET,
    fraDato: '2019-08-14T00:00:00+02:00',
    lenke: null,
    beskrivelse: 'Ekstern aktivitet beskrivelse aaaaa aaaa aa.',
    status: AktivitetStatus.GJENNOMFORES,
    opprettetDato: '2020-05-31T10:46:51.622+01:00',
    endretDato: '2020-09-30T10:46:51.622+01:00',
    endretAv: 'z990207',
    historisk: false,
    endretAvType: 'NAV',
    transaksjonsType: 'STATUS_ENDRET',
    eksternAktivitet: {
        type: EksternAktivitetTypes.VARIG_LONNSTILSKUDD
    },
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
} as Aktivitet;
export const arena_tiltak = {
    versjon: '5345436',
    id: 'EKSTERNAKTIVITET_3',
    tittel: 'Asd eksternaktivitet 123',
    type: AktivitetTypes.EKSTERN_AKTIVITET,
    fraDato: '2022-08-14T00:00:00+02:00',
    tilDato: '2023-08-10T07:45:00+02:00',
    lenke: null,
    beskrivelse: 'Ekstern aktivitet beskrivelse aaaaa aaaa aa.',
    status: AktivitetStatus.GJENNOMFORES,
    opprettetDato: '2020-05-31T10:46:51.622+01:00',
    endretDato: '2020-09-30T10:46:51.622+01:00',
    endretAv: 'z990207',
    historisk: false,
    endretAvType: 'NAV',
    transaksjonsType: 'STATUS_ENDRET',
    eksternAktivitet: {
        type: EksternAktivitetTypes.ARENA_TILTAK
    },
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
} as Aktivitet;
const avklaring = {
    versjon: '5345436',
    id: 'EKSTERNAKTIVITET_4',
    tittel: 'Avklaring',
    type: AktivitetTypes.EKSTERN_AKTIVITET,
    fraDato: '2023-08-14T00:00:00+02:00',
    tilDato: '2025-08-14T00:00:00+02:00',
    lenke: null,
    beskrivelse: '',
    status: AktivitetStatus.GJENNOMFORES,
    opprettetDato: '2023-05-31T10:46:51.622+01:00',
    endretDato: '2023-09-30T10:46:51.622+01:00',
    endretAv: 'z990207',
    historisk: false,
    endretAvType: 'NAV',
    transaksjonsType: 'STATUS_ENDRET',
    eksternAktivitet: {
        type: EksternAktivitetTypes.AVKLARAG
    },
    oppfolgingsperiodeId: gjeldendeOppfolgingsPeriode.uuid
} as Aktivitet;

const aktiviteter: Aktivitet[] = [
    moteAktivitet,
    stilingAktivitet,
    samtalereferatAktivitet,
    behandlingAktivitet,
    sokeavtaleAktivitet,
    sokeavtaleAktivitet2,
    ijobbAktivitet,
    stillingFraNav,
    stillingFraNav2,
    midl_lonnstilsk,
    varig_lonnstilsk,
    arena_tiltak,
    avklaring
];

export default aktiviteter;
