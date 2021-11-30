import { NumberOrNull, StringOrNull } from './Typer';

export enum AktivitetTypes {
    EGEN = 'EGEN',
    STILLING = 'STILLING',
    SOKEAVTALE = 'SOKEAVTALE',
    IJOBB = 'IJOBB',
    BEHANDLING = 'BEHANDLING',
    MOTE = 'MOTE',
    SAMTALEREFERAT = 'SAMTALEREFERAT',
    STILLING_FRA_NAV = 'STILLING_FRA_NAV'
}

export enum KanalTypes {
    OPPMOTE = 'OPPMOTE',
    TELEFON = 'TELEFON',
    INTERNETT = 'INTERNETT'
}

export enum AktivitetStatus {
    PLANLAGT = 'PLANLAGT',
    GJENNOMFORES = 'GJENNOMFORES',
    FULLFORT = 'FULLFORT',
    BRUKER_ER_INTERESSERT = 'BRUKER_ER_INTERESSERT',
    AVBRUTT = 'AVBRUTT'
}

export type StillingsStatus =
    | 'INGEN_VALGT'
    | 'SOKNAD_SENDT'
    | 'INNKALT_TIL_INTERVJU'
    | 'AVSLAG'
    | 'JOBBTILBUD'
    | null
    | undefined;

export interface Aktivitet {
    id: string;
    versjon: StringOrNull;

    tittel: StringOrNull;
    beskrivelse: StringOrNull;
    lenke: StringOrNull;
    type: AktivitetTypes;
    status: AktivitetStatus;
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
    etikett: StillingsStatus;
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
    kanal: KanalTypes;
    referat: StringOrNull;
    erReferatPublisert: boolean;

    //stillingFraNav
}

export enum ArenaAktivitetTypes {
    TILTAKSAKTIVITET = 'TILTAKSAKTIVITET',
    GRUPPEAKTIVITET = 'GRUPPEAKTIVITET',
    UTDANNINGSAKTIVITET = 'UTDANNINGSAKTIVITET'
}

export interface ArenaAktivitet {
    //Felles
    id: string;
    status: AktivitetStatus;
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
