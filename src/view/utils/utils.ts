import { Aktivitet, AktivitetTypes, AlleAktivitetTypes, ArenaAktivitet } from '../../utils/aktivitetTypes';

export const erArenaAktivitet = (aktivitetId: string | null | undefined): boolean =>
    !!aktivitetId && aktivitetId.startsWith('ARENA');

const erGCP = (): boolean => window.location.hostname.endsWith('intern.nav.no');

export const getContextPath = (): string => (erGCP() ? '' : '/veilarbpersonflatefs');

export const getAktivitetType = (aktivitet: Aktivitet | ArenaAktivitet): AlleAktivitetTypes => {
    if (aktivitet.type === AktivitetTypes.EKSTERN_AKTIVITET) {
        return aktivitet.eksternAktivitet!!.type;
    }
    return aktivitet.type;
};
