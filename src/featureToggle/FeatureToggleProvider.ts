import { Status } from '../api/typer';
import { AktivitetApi } from '../api/UseApiBasePath';
import { fetchData } from '../utils/Fetch';
import { FeatureToggle } from './const';
import { createGenericStore } from '../utils/genericStore';
import { useShallow } from 'zustand/react/shallow';

export type Features = Record<FeatureToggle.USE_WEBSOCKETS, boolean>;

export interface FeatureData {
    data: Features;
    status: Status;
    error?: string;
}

export const useFeatureToggleStore = createGenericStore({ [FeatureToggle.USE_WEBSOCKETS]: false }, () =>
    fetchData<Features>(apiUrl)
);

const apiUrl = AktivitetApi.hentFeatureToggles;
export const useFeatureToggleProvider = (): FeatureData => {
    const { data, status, error } = useFeatureToggleStore(
        useShallow((state) => ({
            status: state.status,
            data: state.data,
            error: state.error
        }))
    );

    return {
        data,
        status,
        error
    };
};
