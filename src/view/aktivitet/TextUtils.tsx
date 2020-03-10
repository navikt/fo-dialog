import {
    Aktivitet,
    AktivitetStatus,
    AktivitetTypes,
    ArenaAktivitet,
    ArenaAktivitetTypes
} from '../../utils/AktivitetTypes';

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

export function getDialogTittel(aktivitet: Aktivitet | ArenaAktivitet | undefined) {
    if (!aktivitet) {
        return '';
    }
    const { type, tittel } = aktivitet;

    switch (type) {
        case AktivitetTypes.BEHANDLING:
        case AktivitetTypes.SOKEAVTALE:
            return tittel;
        case AktivitetTypes.EGEN:
            return `Egenaktivitet: ${tittel}`;
        case AktivitetTypes.MOTE:
            return `Møte: ${tittel}`;
        default:
            return `${getTypeText(type)}: ${tittel}`;
    }
}
