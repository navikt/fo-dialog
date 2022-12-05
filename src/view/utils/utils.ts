import { Aktivitet, AktivitetTypes, AlleAktivitetTypes, ArenaAktivitet } from '../../utils/aktivitetTypes';
import { pathnamePrefix } from '../../utils/UseApiBasePath';

export const erArenaAktivitet = (aktivitetId: string | null | undefined): boolean =>
    !!aktivitetId && aktivitetId.startsWith('ARENA');

export const getBasename = (fnr?: string): string => {
    return settSammenmedSlasher(pathnamePrefix, fnr);
};

export const settSammenmedSlasher = (...ss: Array<string | undefined>): string => {
    const slasherImellom = ss
        .filter((s: string | undefined): s is string => !!s)
        .flatMap<string>((s) => s.split('/'))
        .filter((s) => s.trim() !== '')
        .join('/');
    if (slasherImellom !== '') return '/' + slasherImellom;
    else return '';
};

const erGCP = (): boolean => window.location.hostname.endsWith('intern.nav.no');

export const getContextPath = (): string => (erGCP() ? '' : '/veilarbpersonflatefs');

export const getAktivitetType = (aktivitet: Aktivitet | ArenaAktivitet): AlleAktivitetTypes => {
    if (aktivitet.type === AktivitetTypes.EKSTERN_AKTIVITET) {
        return aktivitet.eksternAktivitet!!.type;
    }
    return aktivitet.type;
};

export const runningOnGithubPages = process.env.REACT_APP_USE_HASH_ROUTER === 'true';
