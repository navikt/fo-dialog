import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Status, hasError, isReloading } from '../api/typer';
import { Aktivitet, ArenaAktivitet } from '../utils/aktivitetTypes';
import { fetchData, fnrQuery } from '../utils/Fetch';
import { StringOrNull } from '../utils/Typer';
import { baseApiPath } from '../utils/UseApiBasePath';

export type MaybeAktivitet = Aktivitet | ArenaAktivitet | undefined;

export interface AktivitetDataProviderType {
    aktiviteterStatus: Status;
    arenaAktiviteterStatus: Status;
    hentAktiviteter: () => Promise<Aktivitet[]>;
    hentArenaAktiviteter: () => Promise<ArenaAktivitet[]>;
    aktiviteter: Aktivitet[];
    arenaAktiviteter: ArenaAktivitet[];
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
    aktiviteterStatus: Status.INITIAL,
    arenaAktiviteterStatus: Status.INITIAL,
    aktiviteter: new Array<Aktivitet>(),
    arenaAktiviteter: new Array<ArenaAktivitet>(),
    hentAktiviteter: () => Promise.resolve([]),
    hentArenaAktiviteter: () => Promise.resolve([])
});
export const useAktivitetContext = () => useContext(AktivitetContext);

export function harAktivitetDataFeil(aktivitetData: AktivitetDataProviderType, arenaAktivitet: boolean): boolean {
    if (arenaAktivitet) {
        return hasError(aktivitetData.arenaAktiviteterStatus);
    } else {
        return hasError(aktivitetData.aktiviteterStatus);
    }
}

export const findAktivitet = (aktivitetData: AktivitetDataProviderType, aktivitetId?: StringOrNull): MaybeAktivitet => {
    if (!aktivitetId) {
        return undefined;
    }

    const aktiviteterHasData =
        aktivitetData.aktiviteterStatus === Status.OK || aktivitetData.aktiviteterStatus === Status.RELOADING;
    const aktiviteter: Aktivitet[] = aktiviteterHasData ? aktivitetData.aktiviteter : [];

    const arenaHasData =
        aktivitetData.arenaAktiviteterStatus === Status.OK || aktivitetData.arenaAktiviteterStatus === Status.RELOADING;
    const arena: ArenaAktivitet[] = arenaHasData ? aktivitetData.arenaAktiviteter : [];

    return [...aktiviteter, ...arena].find((aktivitet) => aktivitet.id === aktivitetId);
};

interface AktivitetResponse {
    aktiviteter: Aktivitet[];
}

export const useAktivitetDataProvider = (fnr?: string): AktivitetDataProviderType => {
    const [state, setState] = useState<AktivitetState>(initAktivitetState);

    const query = fnrQuery(fnr);
    const pathnamePrefix = baseApiPath(!!fnr);

    const aktivitetUrl = useMemo(
        () => `${pathnamePrefix}/veilarbaktivitet/api/aktivitet${query}`,
        [pathnamePrefix, query]
    );
    const arenaAktivitetUrl = useMemo(
        () => `${pathnamePrefix}/veilarbaktivitet/api/arena/tiltak${query}`,
        [pathnamePrefix, query]
    );

    const hentAktiviteter: () => Promise<Aktivitet[]> = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isReloading(prevState.aktiviteterStatus) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<AktivitetResponse>(aktivitetUrl)
            .then((response) => {
                setState((prevState) => ({
                    ...prevState,
                    aktiviteterStatus: Status.OK,
                    aktiviteter: response.aktiviteter
                }));
                return response.aktiviteter;
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
            .then((arenaAktiviteter) => {
                setState((prevState) => ({
                    aktiviteter: prevState.aktiviteter,
                    aktiviteterStatus: prevState.aktiviteterStatus,
                    arenaAktiviteterStatus: Status.OK,
                    arenaAktiviteter: arenaAktiviteter
                }));
                return arenaAktiviteter;
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
            aktiviteterStatus: state.aktiviteterStatus,
            arenaAktiviteterStatus: state.arenaAktiviteterStatus,
            aktiviteter: state.aktiviteter,
            arenaAktiviteter: state.arenaAktiviteter,
            hentAktiviteter: hentAktiviteter,
            hentArenaAktiviteter: hentArenaAktiviteter
        };
    }, [state, hentAktiviteter, hentArenaAktiviteter]);
};
