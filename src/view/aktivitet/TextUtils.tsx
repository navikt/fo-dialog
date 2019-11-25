import { AktivitetStatus, AktivitetTypes, ArenaAktivitetTypes } from '../../utils/AktivitetTypes';

export function getStatusText(status: AktivitetStatus): string {
    switch (status) {
        case AktivitetStatus.PLANLAGT:
            return 'Planlegger';
        case AktivitetStatus.GJENNOMFORES:
            return 'Gjennomfører';
        case AktivitetStatus.FULLFORT:
            return 'Fullført';
        case AktivitetStatus.BRUKER_ER_INTERESSERT:
            return 'Forslag';
        case AktivitetStatus.AVBRUTT:
            return 'Avbrutt';
    }
}

export function getTypeText(type: AktivitetTypes | ArenaAktivitetTypes): string {
    switch (type) {
        case AktivitetTypes.MOTE:
            return 'Møte med NAV';
        case AktivitetTypes.STILLING:
            return 'Stilling';
        case AktivitetTypes.SOKEAVTALE:
            return 'Jobbsøking';
        case AktivitetTypes.SAMTALEREFERAT:
            return 'Samtalereferat';
        case AktivitetTypes.BEHANDLING:
            return 'Behandling';
        case AktivitetTypes.EGEN:
            return 'Jobbrettet egenaktivitet';
        case AktivitetTypes.IJOBB:
            return 'Jobb jeg har nå';
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return 'Tiltak gjennom NAV';
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return 'Gruppeaktivitet';
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
            return 'Utdanningsaktivitet';
    }
}

export function getAktivitetIngress(type: AktivitetTypes | ArenaAktivitetTypes): string {
    switch (type) {
        case AktivitetTypes.MOTE:
            return 'NAV ønsker et møte med deg. Du må gi beskjed så raskt som mulig hvis tidspunktet ikke passer.';
        case AktivitetTypes.SOKEAVTALE:
            return 'Her ser du hvor mange jobber NAV forventer at du søker. Legg inn hver stilling du søker i aktiviteten "En jobb jeg vil søke på".';
        case AktivitetTypes.SAMTALEREFERAT:
            return 'Her finner du referat fra en samtale du har hatt med NAV.';
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return 'Her finner du informasjon om et tiltak NAV har søkt deg inn på.';
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return 'Her ser du informasjon om en gruppeaktivitet NAV har meldt deg på';
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
            return 'Her ser du informasjon om en utdanningsaktivitet eller et kurs NAV har registrert at du skal gjennomføre.';
        default:
            return '';
    }
}
