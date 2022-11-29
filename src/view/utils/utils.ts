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

const fraOgMedForsteTegnSomIkkeErEnSlash = /[^/].*/;
const utenSlashForan = (s: string): string => fraOgMedForsteTegnSomIkkeErEnSlash.exec(s)?.shift() ?? '';
export const bareEnSlashForanEllerBlank = (s: string): string => {
    const strippeds = utenSlashForan(s);
    if (strippeds.length === 0) return '';
    else return '/' + s;
};
