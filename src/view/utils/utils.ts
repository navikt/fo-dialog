export const erArenaAktivitet = (aktivitetId: string | null | undefined): boolean =>
    !!aktivitetId && aktivitetId.startsWith('ARENA');

const erGCP = (): boolean => window.location.hostname.endsWith('intern.nav.no');

export const getContextPath = (): string => (erGCP() ? '/' : '/veilarbpersonflatefs');
