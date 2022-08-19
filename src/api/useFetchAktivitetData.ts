import { useEffect, useState } from 'react';

import { Aktivitet } from '../utils/aktivitetTypes';
import { fetchData } from '../utils/Fetch';
import useFetchVeilederNavn from './useHentVeilederData';

export interface AktivitetFetchResult {
    aktivitetData: AktivitetResponse;
    hasError: boolean;
    isPending: boolean;
}

export interface AktivitetResponse {
    aktiviteter: Aktivitet[];
}

export const useFetchAktivitetData = (query: string, apiBasePath: string): AktivitetFetchResult => {
    const [aktivitetData, setAktivitetData] = useState<AktivitetResponse>({ aktiviteter: [] });
    const [hasError, setHasError] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        {
            fetchData<AktivitetResponse>(`${apiBasePath}/veilarbaktivitet/api/aktivitet${query}`)
                .then((aktivitetData) => setAktivitetData(aktivitetData))
                .catch(() => setHasError(true))
                .then(() => setIsPending(false));
        }
    }, [aktivitetData]);

    return { aktivitetData, hasError, isPending };
};
