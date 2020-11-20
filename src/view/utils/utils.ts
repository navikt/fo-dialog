export const erArenaAktivitet = (aktivitetId: string | null | undefined): boolean =>
    !!aktivitetId && aktivitetId.startsWith('ARENA');
