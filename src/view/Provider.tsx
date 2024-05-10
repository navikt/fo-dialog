import React, { useContext, useEffect } from 'react';

import { Status, hasData } from '../api/typer';
import useFetchVeilederNavn from '../api/useHentVeilederData';
import { AktivitetContext, useAktivitetDataProvider } from './AktivitetProvider';
import { AktivitetToggleProvider } from './AktivitetToggleContext';
import { BrukerDataProviderType, useBrukerDataProvider } from './BrukerProvider';
import { DialogContext, useDialogDataProvider } from './DialogProvider';
import { useFeatureToggleProvider } from '../featureToggle/FeatureToggleProvider';
import { OppfolgingContext, useOppfolgingDataProvider } from './OppfolgingProvider';
import { ViewStateProvider } from './ViewState';
import { useDialogStore, useHentDialoger } from './dialogProvider/dialogStore';
import { useShallow } from 'zustand/react/shallow';

interface VeilederData {
    veilederNavn?: string;
}

export const FNRContext = React.createContext<string | undefined>(undefined);
export const VeilederDataContext = React.createContext<VeilederData>({});

export const useFnrContext = () => useContext(FNRContext);
export const useErVeileder = () => useContext(FNRContext) !== undefined;
export const useVeilederDataContext = () => useContext(VeilederDataContext);

type ProviderType<T> = {
    data?: T;
    status: Status;
};

export function dataOrUndefined<T>(context: ProviderType<T>): T | undefined {
    return hasData(context.status) ? context.data : undefined;
}

interface Props {
    fnr?: string;
    enhet?: string;
    erVeileder: boolean;
    children: React.ReactNode;
    visAktivitetDefault?: boolean;
}

export function Provider(props: Props) {
    const { fnr, erVeileder, children, visAktivitetDefault } = props;

    const veilederNavn = useFetchVeilederNavn(erVeileder);

    const { data: feature, status: featureStatus } = useFeatureToggleProvider();
    const { data: bruker, status: brukerstatus }: BrukerDataProviderType = useBrukerDataProvider();
    const oppfolgingDataProvider = useOppfolgingDataProvider();
    const { hentOppfolging } = oppfolgingDataProvider;

    const dialogDataProvider = useDialogDataProvider();

    const aktivitetDataProvider = useAktivitetDataProvider();

    const hentDialoger = useHentDialoger();
    const { configurePoll, stopPolling, dialogstatus } = useDialogStore(
        useShallow((store) => ({
            configurePoll: store.configurePoll,
            stopPolling: store.stopPolling,
            dialogstatus: store.status
        }))
    );
    const { hentAktiviteter, hentArenaAktiviteter } = aktivitetDataProvider;

    useEffect(() => {
        hentOppfolging(fnr);
        hentAktiviteter(fnr);
        hentArenaAktiviteter(fnr);
        return () => stopPolling();
    }, [fnr]);

    const brukerStatusErLastet = hasData(brukerstatus);
    const dialogStatusOk = hasData(dialogstatus);
    const featureStatusOk = hasData(featureStatus);

    const klarTilAaPolle = dialogStatusOk && bruker && brukerStatusErLastet && featureStatusOk;

    useEffect(() => {
        if (!klarTilAaPolle) return;
        configurePoll({
            erBruker: bruker?.erBruker,
            fnr,
            useWebsockets: feature['arbeidsrettet-dialog.websockets']
        });
    }, [klarTilAaPolle, fnr]);

    // if (isDialogPending(dialogstatus) || isPending(brukerstatus) || isPending(oppfolgingstatus)) {
    //     return (
    //         <div className="flex flex-1 justify-center self-center">
    //             <Loader size="3xlarge" />
    //         </div>
    //     );
    // } else if (hasError(brukerstatus) || hasError(oppfolgingstatus) || hasDialogError(dialogstatus)) {
    //     if (hasError(brukerstatus)) {
    //         return <Alert variant="error">Kunne ikke hente brukerinfo. Prøv igjen senere.</Alert>;
    //     }
    //     if (hasError(oppfolgingstatus)) {
    //         return <Alert variant="error">Kunne ikke hente oppfølgingstatus. Prøv igjen senere.</Alert>;
    //     }
    //     return <Alert variant="error">Kunne ikke hente dialoger. Prøv igjen senere.</Alert>;
    // }

    return (
        <DialogContext.Provider value={dialogDataProvider}>
            <OppfolgingContext.Provider value={oppfolgingDataProvider}>
                <AktivitetContext.Provider value={aktivitetDataProvider}>
                    <VeilederDataContext.Provider value={{ veilederNavn }}>
                        <FNRContext.Provider value={fnr}>
                            <ViewStateProvider>
                                <AktivitetToggleProvider defaultValue={visAktivitetDefault || false}>
                                    {children}
                                </AktivitetToggleProvider>
                            </ViewStateProvider>
                        </FNRContext.Provider>
                    </VeilederDataContext.Provider>
                </AktivitetContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
