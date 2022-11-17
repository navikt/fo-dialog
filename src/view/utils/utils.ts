export const erArenaAktivitet = (aktivitetId: string | null | undefined): boolean =>
    !!aktivitetId && aktivitetId.startsWith('ARENA');

export const getBasename = (fnr?: string): string | undefined =>
    getBasenameFromFnrAndPathname(process.env.PUBLIC_URL, fnr);

const fraOgMedForsteTegnSomIkkeErEnSlash = /[^/].*/;
const utenSlashForan = (s: string): string | undefined => fraOgMedForsteTegnSomIkkeErEnSlash.exec(s)?.shift();

export const getBasenameFromFnrAndPathname = (pathnamePrefix?: string, fnr?: string): string | undefined =>
    utenSlashForan([pathnamePrefix, fnr].filter((x) => !!x).join('/'));

const erGCP = (): boolean => window.location.hostname.endsWith('intern.nav.no');

export const getContextPath = (): string => (erGCP() ? '' : '/veilarbpersonflatefs');
