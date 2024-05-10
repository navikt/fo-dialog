import { useFeatureToggleStore } from '../featureToggle/FeatureToggleProvider';
import { defer } from 'react-router';
import { useDialogStore } from '../view/dialogProvider/dialogStore';
import { useBrukerDataStore } from '../view/BrukerProvider';

export const initialPageLoader = (fnr: string | undefined) => () => {
    // feature
    // me
    // hent-status
    // graphql (dialog)
    // graphql (aktivitetsplan)
    // tiltak
    console.log('INITIAL PAGE LOAD');
    return defer({
        features: useFeatureToggleStore.getState().fetch(undefined),
        dialoger: useDialogStore.getState().hentDialoger(fnr),
        me: useBrukerDataStore.getState().fetch(undefined)
    });
};
