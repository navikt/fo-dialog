import React, { useEffect } from 'react';

import { Status, isReloading } from '../api/typer';
import { fetchData } from '../utils/Fetch';
import { FeatureToggle } from './const';
import useSWR from 'swr';
import { getStatus } from '../utils/appStateUtil';
import { AktivitetApi } from '../api/UseApiBasePath';

const ALL_TOGGLES = [FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP] as const;
export type Feature = (typeof ALL_TOGGLES)[number];
export type Features = Record<Feature, boolean>;

export interface FeatureData {
    data: Features;
    status: Status;
    error?: string;
}

const initBrukerState: FeatureData = {
    data: { [FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP]: false },
    status: Status.INITIAL
};

export const FeatureToggleContext = React.createContext<Features>({
    [FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP]: false
});
const apiUrl = AktivitetApi.hentFeatureToggles;
export const useFeatureToggleProvider = (): FeatureData => {
    const { data, isLoading, error, mutate, isValidating } = useSWR('features', () => fetchData<Features>(apiUrl));
    return {
        data: data || initBrukerState.data,
        status: getStatus(data, isLoading, isValidating, error),
        error: error
    };
};
