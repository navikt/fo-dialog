import React, { useContext, useEffect, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { AktivitetApi } from '../api/UseApiBasePath';
import { fetchData } from '../utils/Fetch';

export enum FeatureToggle {
    VIS_SKJUL_AKTIVITET_KNAPP = 'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp'
}
const ALL_TOGGLES = [FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP] as const;
export type Feature = (typeof ALL_TOGGLES)[number];
export type Features = Record<Feature, boolean>;
export const featureToggleQuery = new URLSearchParams({ feature: FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP }).toString();

export interface BrukerDataProviderType {
    data: Features;
    status: Status;
    error?: string;
}

const initBrukerState: BrukerDataProviderType = {
    data: { 'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp': false },
    status: Status.INITIAL
};

export const FeatureToggleContext = React.createContext<Features>({
    'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp': false
});
export const useFeatureToggleContext = () => useContext(FeatureToggleContext);

export const useCompactMode = () =>   useFeatureToggleContext()["arbeidsrettet-dialog.vis-skjul-aktivitet-knapp"]

export const useFeatureToggleProvider = (): BrukerDataProviderType => {
    const [state, setState] = useState<BrukerDataProviderType>(initBrukerState);
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
