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
    fnr: string;
    aktorId: string;
    veilederId: StringOrNull;
    reservasjonKRR: boolean;
    kanVarsles: boolean;
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
    erSykmeldtMedArbeidsgiver: boolean;
    servicegruppe: StringOrNull;
    formidlingsgruppe: StringOrNull;
}

export interface PeriodeData {
    aktorId: string;
    veileder: boolean;
    startDato: StringOrNull;
    sluttDato: StringOrNull;
    begrunnelse: StringOrNull;
}
