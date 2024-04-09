import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Status, hasError, isReloading } from '../api/typer';
import { AktivitetApi } from '../api/UseApiBasePath';
import { Aktivitet, ArenaAktivitet } from '../utils/aktivitetTypes';
import { fetchData } from '../utils/Fetch';
import { StringOrNull } from '../utils/Typer';
import { hentAktiviteterGraphql } from '../api/aktivitetsplanGraphql';

export type MaybeAktivitet = Aktivitet | ArenaAktivitet | undefined;

export interface AktivitetDataProviderType {
    aktiviteterStatus: Status;
    arenaAktiviteterStatus: Status;
    hentAktiviteter: (fnr: string | undefined) => Promise<Aktivitet[]>;
    hentArenaAktiviteter: (fnr: string | undefined) => Promise<ArenaAktivitet[]>;
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
    hentAktiviteter: (fnr) => Promise.resolve([]),
    hentArenaAktiviteter: (fnr) => Promise.resolve([])
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

const arenaAktivitetUrl = AktivitetApi.hentArenaAktiviteter;

export const useAktivitetDataProvider = (): AktivitetDataProviderType => {
    const [state, setState] = useState<AktivitetState>(initAktivitetState);
    const hentAktiviteter: (fnr: string | undefined) => Promise<Aktivitet[]> = useCallback(
        (fnr: string | undefined) => {
            setState((prevState) => ({
                ...prevState,
                status: isReloading(prevState.aktiviteterStatus) ? Status.RELOADING : Status.PENDING
            }));
            return hentAktiviteterGraphql(fnr)
                .then((response) => {
                    const aktiviteter = response.data.perioder.flatMap((periode) => periode.aktiviteter);
                    setState((prevState) => ({
                        ...prevState,
                        aktiviteterStatus: Status.OK,
                        aktiviteter
                    }));
                    return aktiviteter;
                })
                .catch((err) => {
                    console.log(err);
                    setState((prevState) => ({
                        ...prevState,
                        aktiviteterStatus: Status.ERROR
                    }));
                    return [];
                });
        },
        []
    );

    const hentArenaAktiviteter: (fnr: string | undefined) => Promise<ArenaAktivitet[]> = useCallback(
        (fnr: string | undefined) => {
            setState((prevState) => ({
                ...prevState,
                status: isReloading(prevState.arenaAktiviteterStatus) ? Status.RELOADING : Status.PENDING
            }));
            return fetchData<ArenaAktivitet[]>(arenaAktivitetUrl, {
                method: 'POST',
                body: JSON.stringify({ fnr })
            })
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
        },
        []
    );

    return useMemo(() => {
        return {
            aktiviteterStatus: state.aktiviteterStatus,
            arenaAktiviteterStatus: state.arenaAktiviteterStatus,
            aktiviteter: state.aktiviteter,
            arenaAktiviteter: state.arenaAktiviteter,
            hentAktiviteter: hentAktiviteter,
            hentArenaAktiviteter: hentArenaAktiviteter
        };
    }, [state]);
};
