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

export interface FeatureData {
    data: Features;
    status: Status;
    error?: string;
}

const initBrukerState: FeatureData = {
    data: { 'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp': false },
    status: Status.INITIAL
};

export const FeatureToggleContext = React.createContext<Features>({
    'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp': false
});
export const useFeatureToggleContext = () => useContext(FeatureToggleContext);

export const useCompactMode = () => useFeatureToggleContext()['arbeidsrettet-dialog.vis-skjul-aktivitet-knapp'];

const onStorageChange = (setState: (value: (prevState: FeatureData) => FeatureData) => void) => (event: any) => {
    const mode = localStorage.getItem('compactMode');
    setState((state: FeatureData) => {
        return {
            ...state,
            data: { 'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp': mode === 'compact' }
        };
    });
};

export const useFeatureToggleProvider = (): FeatureData => {
    const [state, setState] = useState<FeatureData>(initBrukerState);
    const apiUrl = AktivitetApi.hentFeatureToggles;

    useEffect(() => {
        const listener = onStorageChange(setState);
        window.addEventListener('storage', listener);
        return () => {
            console.log('Removing listener');
            removeEventListener('storage', listener);
        };
    }, []);

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
