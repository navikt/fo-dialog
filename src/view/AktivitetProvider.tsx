import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Aktivitet, ArenaAktivitet } from '../utils/aktivitetTypes';
import { fetchData, fnrQuery, getApiBasePath } from '../utils/Fetch';
import { StringOrNull } from '../utils/Typer';

export type MaybeAktivitet = Aktivitet | ArenaAktivitet | undefined;

export enum Status {
    INITIAL,
    PENDING,
    RELOADING,
    OK,
    ERROR
}

export interface AktivitetDataProviderType {
    contextAktiviteterStatus: Status;
    contextArenaAktiviteterStatus: Status;
    contextHentAktiviteter: () => Promise<Aktivitet[]>;
    contextHentArenaAktiviteter: () => Promise<ArenaAktivitet[]>;
    contextAktiviteter: Aktivitet[];
    contextArenaAktiviteter: ArenaAktivitet[];
}

export interface AktivitetState {
    aktiviteterStatus: Status;
    arenaAktiviteterStatus: Status;
    aktiviteter: Aktivitet[];
    arenaAktiviteter: ArenaAktivitet[];
}

const initAktivitetState: AktivitetState = {
    aktiviteterStatus: Status.INITIAL,
    arenaAktiviteterStatus: Status.INITIAL,
    aktiviteter: [],
    arenaAktiviteter: []
};

export const AktivitetContext = React.createContext<AktivitetDataProviderType>({
    contextAktiviteterStatus: Status.INITIAL,
    contextArenaAktiviteterStatus: Status.INITIAL,
    contextAktiviteter: [],
    contextArenaAktiviteter: [],
    contextHentAktiviteter: () => Promise.resolve([]),
    contextHentArenaAktiviteter: () => Promise.resolve([])
});
export const useAktivitetContext = () => useContext(AktivitetContext);

export function harAktivitetDataFeil(aktivitetData: AktivitetDataProviderType, arenaAktivitet: boolean): boolean {
    if (arenaAktivitet) {
        return hasError(aktivitetData.contextArenaAktiviteterStatus);
    } else {
        return hasError(aktivitetData.contextAktiviteterStatus);
    }
}

export const findAktivitet = (aktivitetData: AktivitetDataProviderType, aktivitetId?: StringOrNull): MaybeAktivitet => {
    if (!aktivitetId) {
        return undefined;
    }

    const aktiviteterHasData =
        aktivitetData.contextAktiviteterStatus === Status.OK ||
        aktivitetData.contextAktiviteterStatus === Status.RELOADING;
    const aktiviteter: Aktivitet[] = aktiviteterHasData ? aktivitetData.contextAktiviteter : [];

    const arenaHasData =
        aktivitetData.contextArenaAktiviteterStatus === Status.OK ||
        aktivitetData.contextArenaAktiviteterStatus === Status.RELOADING;
    const arena: ArenaAktivitet[] = arenaHasData ? aktivitetData.contextArenaAktiviteter : [];

    // const aa = aktiviteter && aktiviteter.find((aktivitet) => aktivitet.id === aktivitetId);
    // const bb = arena && arena.find((aktivitet) => aktivitet.id === aktivitetId);
    return [...aktiviteter, ...arena].find((aktivitet) => aktivitet.id === aktivitetId);
};

export const useAktivitetDataProvider = (fnr?: string): AktivitetDataProviderType => {
    const [state, setState] = useState(initAktivitetState);

    const apiBasePath = getApiBasePath(fnr);
    const query = fnrQuery(fnr);

    const aktivitetUrl = useMemo(() => `${apiBasePath}/veilarbaktivitet/api/aktivitet${query}`, [apiBasePath, query]);
    const arenaAktivitetUrl = useMemo(
        () => `${apiBasePath}/veilarbaktivitet/api/arena/tiltak${query}`,
        [apiBasePath, query]
    );

    const hentAktiviteter: () => Promise<Aktivitet[]> = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isReloading(prevState.aktiviteterStatus) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<Aktivitet[]>(aktivitetUrl)
            .then((aktiviteter) => {
                setState((prevState) => ({
                    ...prevState,
                    aktiviteterStatus: Status.OK,
                    aktiviteter: aktiviteter
                }));
                return aktiviteter;
            })
            .catch(() => {
                setState((prevState) => ({
                    ...prevState,
                    aktiviteterStatus: Status.ERROR
                }));
                return [];
            });
    }, [aktivitetUrl, setState]);

    const hentArenaAktiviteter: () => Promise<ArenaAktivitet[]> = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isReloading(prevState.arenaAktiviteterStatus) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<ArenaAktivitet[]>(arenaAktivitetUrl)
            .then((aktiviteter) => {
                setState((prevState) => ({
                    ...prevState,
                    arenaAktiviteterStatus: Status.OK,
                    arenaAktiviteter: aktiviteter
                }));
                return aktiviteter;
            })
            .catch(() => {
                setState((prevState) => ({
                    ...prevState,
                    arenaAktiviteterStatus: Status.ERROR
                }));
                return [];
            });
    }, [arenaAktivitetUrl, setState]);

    return useMemo(() => {
        return {
            contextAktiviteterStatus: state.aktiviteterStatus,
            contextArenaAktiviteterStatus: state.arenaAktiviteterStatus,
            contextAktiviteter: state.aktiviteter,
            contextArenaAktiviteter: state.arenaAktiviteter,
            contextHentAktiviteter: hentAktiviteter,
            contextHentArenaAktiviteter: hentArenaAktiviteter
        };
    }, [state, hentAktiviteter, hentArenaAktiviteter]);
};

function isReloading(status: Status) {
    return status === Status.OK || status === Status.RELOADING;
}

export function isOk(status: Status) {
    return status === Status.OK;
}

export function isPending(status: Status) {
    return status === Status.PENDING;
}

export function isPendingOrReloading(status: Status) {
    return status === Status.PENDING || status === Status.RELOADING;
}

export function hasError(status: Status) {
    return status === Status.ERROR;
}
