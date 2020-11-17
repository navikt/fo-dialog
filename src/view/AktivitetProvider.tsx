import useFetch, { FetchResult, Status, hasData } from '@nutgaard/use-fetch';
import React, { useContext } from 'react';

import { Aktivitet, ArenaAktivitet } from '../utils/AktivitetTypes';
import { REQUEST_CONFIG, fnrQuery } from '../utils/Fetch';
import { StringOrNull } from '../utils/Typer';

export type MaybeAktivitet = Aktivitet | ArenaAktivitet | undefined;

interface AktivitetResponse {
    aktiviteter: Aktivitet[];
}
export interface AktivitetContextType {
    aktiviteter: FetchResult<AktivitetResponse>;
    arenaAktiviter: FetchResult<ArenaAktivitet[]>;
}

const inital: AktivitetContextType = {
    aktiviteter: {
        status: Status.INIT,
        statusCode: 0,
        rerun(): void {}
    },
    arenaAktiviter: {
        status: Status.INIT,
        statusCode: 0,
        rerun(): void {}
    }
};

export const AktivitetContext = React.createContext(inital);
export const useAktivitetContext = () => useContext(AktivitetContext);

export function isLoadingData(aktivitetData: AktivitetContextType): boolean {
    const aktiviteter = hasData(aktivitetData.aktiviteter);
    const arena = hasData(aktivitetData.arenaAktiviter);

    return !aktiviteter || !arena;
}

export function findAktivitet(aktivitetData: AktivitetContextType, aktivitetId?: StringOrNull): MaybeAktivitet {
    if (!aktivitetId) {
        return undefined;
    }

    const aktiviteter = hasData(aktivitetData.aktiviteter) ? aktivitetData.aktiviteter.data.aktiviteter : undefined;
    const arena = hasData(aktivitetData.arenaAktiviter) ? aktivitetData.arenaAktiviter.data : undefined;

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
    const query = fnrQuery(props.fnr);
    const apiBasePath = props.apiBasePath;

    const aktiviteterFetch = useFetch<AktivitetResponse>(
        `${apiBasePath}/veilarbaktivitet/api/aktivitet${query}`,
        REQUEST_CONFIG
    );
    const arenaAktiviteterFetch = useFetch<ArenaAktivitet[]>(
        `${apiBasePath}/veilarbaktivitet/api/aktivitet/arena${query}`,
        REQUEST_CONFIG
    );

    return (
        <AktivitetContext.Provider value={{ aktiviteter: aktiviteterFetch, arenaAktiviter: arenaAktiviteterFetch }}>
            {props.children}
        </AktivitetContext.Provider>
    );
}
