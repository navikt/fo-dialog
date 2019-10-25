import { NumberOrNull, StringOrNull } from './Typer';

export enum AktivitetTypes {
    EGEN = 'EGEN',
    STILLING = 'STILLING',
    SOKEAVTALE = 'SOKEAVTALE',
    IJOBB = 'IJOBB',
    BEHANDLING = 'BEHANDLING',
    MOTE = 'MOTE',
    SAMTALEREFERAT = 'SAMTALEREFERAT'
}

export enum KanalTypes {
    OPPMOTE = 'OPPMOTE',
    TELEFON = 'TELEFON',
    INTERNETT = 'INTERNETT'
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
    kanal: KanalTypes;
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
