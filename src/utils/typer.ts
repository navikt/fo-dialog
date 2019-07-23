export type ValueOrUndefinedOrNull<T> = T | null | undefined;
export type StringOrUndefinedOrNull = ValueOrUndefinedOrNull<string>;

export interface NyDialogMeldingData {
    tekst: string;
    dialogId: StringOrUndefinedOrNull;
    overskrift?: string;
}

export interface DialogData {
    id: string;
    aktivitetId: StringOrUndefinedOrNull;
    overskrift: StringOrUndefinedOrNull;
    sisteTekst: StringOrUndefinedOrNull;
    sisteDato: StringOrUndefinedOrNull;
    opprettetDato: StringOrUndefinedOrNull;
    historisk: boolean;
    lest: boolean;
    venterPaSvar: boolean;
    ferdigBehandlet: boolean;
    lestAvBrukerTidspunkt: StringOrUndefinedOrNull;
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
    fnr: StringOrUndefinedOrNull;
    veilederId: StringOrUndefinedOrNull;
    reservasjonKRR: boolean;
    manuell: boolean;
    underOppfolging: boolean;
    underKvp: boolean;
    oppfolgingUtgang: StringOrUndefinedOrNull;
    gjeldendeEskaleringsvarsel: StringOrUndefinedOrNull;
    kanStarteOppfolging: boolean;
    avslutningStatus: StringOrUndefinedOrNull;
    oppfolgingsPerioder: PeriodeData[];
    harSkriveTilgang: boolean;
    kanReaktiveres: boolean;
    inaktiveringsdato: StringOrUndefinedOrNull;
}

export interface PeriodeData {
    aktorId: string;
    veileder: boolean;
    startDato: StringOrUndefinedOrNull;
    sluttDato: StringOrUndefinedOrNull;
    begrunnelse: StringOrUndefinedOrNull;
}
