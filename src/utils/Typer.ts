export type ValueOrNull<T> = T | null;
export type StringOrNull = ValueOrNull<string>;
export type NumberOrNull = ValueOrNull<number>;

export interface NyDialogMeldingData {
    tekst: string;
    dialogId: StringOrNull;
    overskrift?: string;
}

export interface DialogData {
    id: string;
    aktivitetId: StringOrNull;
    overskrift: StringOrNull;
    sisteTekst: StringOrNull;
    sisteDato: StringOrNull;
    opprettetDato: StringOrNull;
    historisk: boolean;
    lest: boolean;
    venterPaSvar: boolean;
    ferdigBehandlet: boolean;
    lestAvBrukerTidspunkt: StringOrNull;
    erLestAvBruker: boolean;
    henvendelser: HenvendelseData[];
    egenskaper: string[];
}

export interface HenvendelseData {
    id: string;
    dialogId: string;
    avsender: string;
    avsenderId: string;
    sendt: string;
    lest: boolean;
    tekst: string;
}

export interface Bruker {
    id: string;
    erVeileder: boolean;
    erBruker: boolean;
}

export interface OppfolgingData {
    fnr: StringOrNull;
    veilederId: StringOrNull;
    reservasjonKRR: boolean;
    manuell: boolean;
    underOppfolging: boolean;
    underKvp: boolean;
    oppfolgingUtgang: StringOrNull;
    gjeldendeEskaleringsvarsel: StringOrNull;
    kanStarteOppfolging: boolean;
    avslutningStatus: StringOrNull;
    oppfolgingsPerioder: PeriodeData[];
    harSkriveTilgang: boolean;
    kanReaktiveres: boolean;
    inaktiveringsdato: StringOrNull;
}

export interface PeriodeData {
    aktorId: string;
    veileder: boolean;
    startDato: StringOrNull;
    sluttDato: StringOrNull;
    begrunnelse: StringOrNull;
}

export enum AktivitetTypes {
    EGEN = 'EGEN',
    STILLING = 'STILLING',
    SOKEAVTALE = 'SOKEAVTALE',
    IJOBB = 'IJOBB',
    BEHANDLING = 'BEHANDLING',
    MOTE = 'MOTE',
    SAMTALEREFERAT = 'SAMTALEREFERAT'
}

export interface Aktivitet {
    id: StringOrNull;
    versjon: StringOrNull;

    tittel: StringOrNull;
    beskrivelse: StringOrNull;
    lenke: StringOrNull;
    type: AktivitetTypes;
    status: StringOrNull;
    fraDato: StringOrNull;
    tilDato: StringOrNull;
    opprettetDato: string;
    endretDato: StringOrNull;
    endretAv: StringOrNull;
    historisk: boolean;
    avsluttetKommentar: StringOrNull;
    avtalt: boolean;
    lagtInnAv: StringOrNull;
    transaksjonsType: StringOrNull;
    malid: StringOrNull;

    // stillingaktivitet
    etikett: StringOrNull;
    kontaktperson: StringOrNull;
    arbeidsgiver: StringOrNull;
    arbeidssted: StringOrNull;
    stillingsTittel: StringOrNull;

    // egenaktivitet
    hensikt: StringOrNull;
    oppfolging: StringOrNull;

    //sokeAvtaleAktivitet
    antallStillingerSokes: NumberOrNull;
    antallStillingerIUken: NumberOrNull;
    avtaleOppfolging: StringOrNull;

    //iJobbAktivitet
    jobbStatus: StringOrNull;
    ansettelsesforhold: StringOrNull;
    arbeidstid: StringOrNull;

    //behandlingAktivitet
    behandlingType: StringOrNull;
    behandlingSted: StringOrNull;
    effekt: StringOrNull;
    behandlingOppfolging: StringOrNull;

    //møte
    adresse: StringOrNull;
    forberedelser: StringOrNull;
    kanal: StringOrNull;
    referat: StringOrNull;
    erReferatPublisert: boolean;
}

export enum ArenaAktivitetTypes {
    TILTAKSAKTIVITET = 'TILTAKSAKTIVITET',
    GRUPPEAKTIVITET = 'GRUPPEAKTIVITET',
    UTDANNINGSAKTIVITET = 'UTDANNING'
}

export interface ArenaAktivitet {
    //Felles
    id: StringOrNull;
    status: StringOrNull;
    type: ArenaAktivitetTypes;
    tittel: StringOrNull;
    beskrivelse: StringOrNull;
    fraDato: StringOrNull;
    tilDato: StringOrNull;
    opprettetDato: StringOrNull;
    avtalt: boolean;
    etikett: StringOrNull;

    // Tiltaksaktivitet
    deltakelseProsent: NumberOrNull;
    tiltaksnavn: StringOrNull;
    tiltakLokaltNavn: StringOrNull;
    arrangoer: StringOrNull;
    bedriftsnummer: StringOrNull;
    antallDagerPerUke: NumberOrNull;
    statusSistEndret: StringOrNull;

    // Gruppeaktivitet
    moeteplanListe: object[] | null;
}
