import * as Nutgaard from '@nutgaard/use-fetch';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { AktivitetFetchResult, AktivitetResponse, useFetchAktivitetData } from '../api/useFetchAktivitetData';
import aktiviteter from '../mock/Aktivitet';
import { Aktivitet, ArenaAktivitet } from '../utils/aktivitetTypes';
import { REQUEST_CONFIG, fetchData, fnrQuery, getApiBasePath } from '../utils/Fetch';
import { DialogData, StringOrNull } from '../utils/Typer';
import useFetch from '../utils/UseFetch';
import { DialogDataProviderType } from './DialogProvider';

export type MaybeAktivitet = Aktivitet | ArenaAktivitet | undefined;

enum Status {
    INITIAL,
    PENDING,
    RELOADING,
    OK,
    ERROR
}

export interface AktivitetDataProviderType {
    aktiviteter: () => Promise<AktivitetContextType>;
    arenaAktiviter: Nutgaard.FetchResult<ArenaAktivitet[]>;
}

export interface AktiviteterContextType {
    aktiviteter: AktivitetContextType;
    arenaAktiviter: Nutgaard.FetchResult<ArenaAktivitet[]>;
}

export interface AktivitetContextType {
    aktiviteter: Aktivitet[];
    status: Status;
}

const inital: AktiviteterContextType = {
    aktiviteter: {
        aktiviteter: [],
        status: Status.INITIAL
    },
    arenaAktiviter: {
        status: Nutgaard.Status.INIT,
        statusCode: 0,
        rerun(): void {}
    }
};

export const AktivitetContext = React.createContext(inital);
export const useAktivitetContext = () => useContext(AktivitetContext);

export function harAktivitetDataFeil(aktivitetData: AktiviteterContextType, arenaAktivitet: boolean): boolean {
    if (arenaAktivitet) {
        return aktivitetData.arenaAktiviter.statusCode != 0;
    } else {
        return hasError(aktivitetData.aktiviteter.status);
    }
}

export function findAktivitet(aktivitetData: AktiviteterContextType, aktivitetId?: StringOrNull): MaybeAktivitet {
    if (!aktivitetId) {
        return undefined;
    }

    const aktiviteter = aktivitetData.aktiviteter.aktiviteter;
    const arena = Nutgaard.hasData(aktivitetData.arenaAktiviter) ? aktivitetData.arenaAktiviter.data : undefined;

    if (aktivitetId.startsWith('ARENA')) {
        return arena && arena.find((a) => a.id === aktivitetId);
    }
    return aktiviteter && aktiviteter.find((a) => a.id === aktivitetId);
}

interface Props {
    fnr?: string;
    apiBasePath: string;
    children: React.ReactNode;
}

export function AktivitetProvider(props: Props) {
    const [state, setState] = useState(inital);
    const query = fnrQuery(props.fnr);
    const apiBasePath = props.apiBasePath;
    const baseUrl = useMemo(() => `${apiBasePath}/veilarbaktivitet/api/arena/tiltak${query}`, [apiBasePath, query]);

    const hentAktiviteter: () => Promise<AktivitetContextType> = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isReloading(prevState.aktiviteter.status) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<Aktivitet[]>(baseUrl)
            .then((a) => {
                setState((prevState) => ({
                    ...prevState,
                    aktiviteter: {
                        aktiviteter: a,
                        status: Status.OK
                    }
                }));
                return { aktiviteter: a, status: Status.OK };
            })
            .catch(() => {
                setState((prevState) => ({
                    ...prevState,
                    aktiviteter: { ...prevState.aktiviteter, status: Status.ERROR }
                }));
                return { aktiviteter: [], status: Status.ERROR };
            });
    }, [baseUrl, setState]);

    const arenaAktiviteterFetch = useFetch<ArenaAktivitet[]>(
        `${apiBasePath}/veilarbaktivitet/api/arena/tiltak${query}`,
        REQUEST_CONFIG
    );

    return (
        <AktivitetContext.Provider value={{ aktiviteter: hentAktiviteter, arenaAktiviter: arenaAktiviteterFetch }}>
            {props.children}
        </AktivitetContext.Provider>
    );
}

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
