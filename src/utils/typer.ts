export type ValueOrUndefinedOrNull<T> = T |null | undefined;
export type StringOrUndefinedOrNull = ValueOrUndefinedOrNull<string>;

export interface DialogData {

    id: string;
    aktivitetId: StringOrUndefinedOrNull,
    overskrift: StringOrUndefinedOrNull,
    sisteTekst: StringOrUndefinedOrNull,
    sisteDato: StringOrUndefinedOrNull,
    opprettetDato: StringOrUndefinedOrNull,
    historisk: boolean,
    lest: boolean,
    venterPaSvar: boolean,
    ferdigBehandlet: boolean
    lestAvBrukerTidspunkt: StringOrUndefinedOrNull,
    erLestAvBruker: boolean,
    henvendelser: HenvendelseData[],
    egenskaper: string[]
}

export interface HenvendelseData {

    id: string,
    dialogId: string,
    avsender: StringOrUndefinedOrNull,
    avsenderId: StringOrUndefinedOrNull,
    sendt: StringOrUndefinedOrNull,
    lest: boolean,
    tekst: StringOrUndefinedOrNull,

}


