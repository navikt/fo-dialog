import React, { useEffect, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { AktivitetApi } from '../api/UseApiBasePath';
import { fetchData } from '../utils/Fetch';
import { FeatureToggle } from './const';

const ALL_TOGGLES = [FeatureToggle.USE_WEBSOCKETS] as const;
export type Feature = (typeof ALL_TOGGLES)[number];
export type Features = Record<Feature, boolean>;

export interface FeatureData {
    data: Features;
    status: Status;
    error?: string;
}

const initBrukerState: FeatureData = {
    data: { [FeatureToggle.USE_WEBSOCKETS]: false },
    status: Status.INITIAL
};

export const FeatureToggleContext = React.createContext<Features>({
    [FeatureToggle.USE_WEBSOCKETS]: false
});

export const useFeatureToggleProvider = (): FeatureData => {
    const [state, setState] = useState<FeatureData>(initBrukerState);
    const apiUrl = AktivitetApi.hentFeatureToggles;

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            status: isReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        fetchData<Features>(apiUrl)
            .then((featureToggles) => {
                setState({
                    data: featureToggles,
                    status: Status.OK
                });
            })
            .catch((e) => {
                setState((prevState) => ({
                    ...prevState,
                    error: e,
                    status: Status.ERROR
                }));
            });
    }, [apiUrl]);

    return {
        data: state.data || initBrukerState.data,
        status: state.status,
        error: state.error
    };
};
