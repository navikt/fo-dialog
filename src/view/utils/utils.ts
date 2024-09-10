import { Aktivitet, AktivitetTypes, AlleAktivitetTypes, ArenaAktivitet } from '../../utils/aktivitetTypes';

export const erArenaAktivitet = (aktivitetId: string | null | undefined): boolean =>
    !!aktivitetId && aktivitetId.startsWith('ARENA');

export const settSammenmedSlasher = (...ss: Array<string | undefined>): string => {
    const slasherImellom = ss
        .filter((s: string | undefined): s is string => !!s)
        .flatMap<string>((s) => s.split('/'))
        .filter((s) => s.trim() !== '')
        .join('/');
    if (slasherImellom !== '') return '/' + slasherImellom;
    else return '';
};

export const getAktivitetType = (aktivitet: Aktivitet | ArenaAktivitet): AlleAktivitetTypes => {
    if (aktivitet.type === AktivitetTypes.EKSTERN_AKTIVITET) {
        return aktivitet.eksternAktivitet!.type;
    }
    return aktivitet.type;
};
