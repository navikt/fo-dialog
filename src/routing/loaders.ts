import { useFeatureToggleStore } from '../featureToggle/FeatureToggleProvider';
import { defer, useRouteLoaderData } from 'react-router';
import { useDialogStore } from '../view/dialogProvider/dialogStore';
import { useBrukerDataStore } from '../view/BrukerProvider';
import { useOppfolgingStore } from '../view/OppfolgingProvider';
import { useVeilederNavnStore } from '../api/useHentVeilederData';
import { useAktivitetStore, useTiltaksAktivitetStore } from '../view/AktivitetProvider';
import { RouteIds } from './routes';
import { useInnsynsrettStore } from '../api/useInnsynsrett';

export const initialPageLoader = (fnr: string | undefined) => async () => {
    const erVeileder = !!fnr;

    return defer({
        features: useFeatureToggleStore.getState().fetch(undefined),
        dialoger: useDialogStore.getState().hentDialoger(fnr),
        me: useBrukerDataStore.getState().fetch(undefined),
        oppfolging: useOppfolgingStore.getState().fetch(fnr),
        veilederNavn: erVeileder ? useVeilederNavnStore.getState().fetch(fnr) : Promise.resolve(null),
        aktiviteter: useAktivitetStore.getState().fetch(fnr),
        arenaAktiviteter: useTiltaksAktivitetStore.getState().fetch(fnr),
        innsynsrett:  erVeileder ?  Promise.resolve(null) : useInnsynsrettStore.getState().fetch(undefined)
    });
};

export const useRootLoaderData = () =>
    useRouteLoaderData(RouteIds.Root) as {
        features: Promise<void>;
        dialoger: Promise<void>;
        me: Promise<void>;
        oppfolging: Promise<void>;
        veilederNavn: Promise<void>;
        aktiviteter: Promise<void>;
        arenaAktiviteter: Promise<void>;
    };
