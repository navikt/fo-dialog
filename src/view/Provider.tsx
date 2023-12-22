import { Alert, Loader } from '@navikt/ds-react';
import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { listenForNyDialogEvents } from '../api/nyDialogWs';
import { Status, hasData, hasError, isPending } from '../api/typer';
import useFetchHarNivaa4, { HarNivaa4Response } from '../api/useFetchHarNivaa4';
import useFetchVeilederNavn from '../api/useHentVeilederData';
import { AktivitetContext, useAktivitetDataProvider } from './AktivitetProvider';
import { AktivitetToggleProvider } from './AktivitetToggleContext';
import { BrukerDataProviderType, UserInfoContext, useBrukerDataProvider } from './BrukerProvider';
import { DialogContext, hasDialogError, isDialogPending, useDialogDataProvider } from './DialogProvider';
import { FeatureToggleContext, useFeatureToggleProvider } from '../featureToggle/FeatureToggleProvider';
import { KladdContext, useKladdDataProvider } from './KladdProvider';
import { OppfolgingContext, useOppfolgingDataProvider } from './OppfolgingProvider';
import { ViewStateProvider } from './ViewState';
import { useDialogStore } from './dialogProvider/dialogStore';
import { useShallow } from 'zustand/react/shallow';

interface VeilederData {
    veilederNavn?: string;
}

export const FNRContext = React.createContext<string | undefined>(undefined);
export const VeilederDataContext = React.createContext<VeilederData>({});
export const HarNivaa4Context = React.createContext<HarNivaa4Response>({
    harNivaa4: false,
    isPending: false,
    hasError: false
});

export const useFnrContext = () => useContext(FNRContext);
export const useVeilederDataContext = () => useContext(VeilederDataContext);
export const useHarNivaa4Context = () => useContext(HarNivaa4Context);

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
    const { data: bruker, status: brukerstatus }: BrukerDataProviderType = useBrukerDataProvider(fnr);
    const oppfolgingDataProvider = useOppfolgingDataProvider(fnr);
    const { status: oppfolgingstatus, hentOppfolging } = oppfolgingDataProvider;

    const harLoggetInnNiva4 = useFetchHarNivaa4(erVeileder, fnr);

    const dialogDataProvider = useDialogDataProvider(fnr);
    useEffect(() => {
        console.log('Effect dialogDataProvider');
    }, [dialogDataProvider]);

    const aktivitetDataProvider = useAktivitetDataProvider(fnr);
    const kladdDataProvider = useKladdDataProvider();

    const { status: dialogstatus } = dialogDataProvider;
    const { hentDialoger, pollForChanges, silentlyHentDialoger } = useDialogStore(
        useShallow((store) => ({
            hentDialoger: store.hentDialoger,
            pollForChanges: store.pollForChanges,
            silentlyHentDialoger: store.silentlyHentDialoger
        }))
    );
    const { hentAktiviteter, hentArenaAktiviteter } = aktivitetDataProvider;
    const hentKladder = kladdDataProvider.hentKladder;

    useEffect(() => {
        hentOppfolging();
    }, [hentOppfolging]);

    useEffect(() => {
        hentAktiviteter();
        hentArenaAktiviteter();
    }, [hentAktiviteter, hentArenaAktiviteter]);

    useEffect(() => {
        hentDialoger(fnr);
        hentKladder(fnr);
    }, [fnr]);

    const brukerStatusErLastet = hasData(brukerstatus);
    const dialogStatusOk = hasData(dialogstatus);
    const featureStatusOk = hasData(featureStatus);

    const klarTilAaPolle = dialogStatusOk && bruker && brukerStatusErLastet && featureStatusOk;

    const isPolling = useRef(false);
    const pollWithHttp = useCallback(() => {
        return;
        let interval: NodeJS.Timeout;
        console.log('Setting up polling with http');
        interval = setInterval(() => {
            pollForChanges(fnr).catch((e) => {
                console.error(e);
                clearInterval(interval);
            });
        }, 2000);
        return () => {
            console.log('Stopping polling with http');
            isPolling.current = false;
            clearInterval(interval);
        };
    }, [pollForChanges, fnr]);

    useEffect(() => {
        if (!klarTilAaPolle) return;
        if (isPolling.current) return;
        isPolling.current = true;
        if (bruker.erBruker) {
            return pollWithHttp();
        } else {
            if (feature['arbeidsrettet-dialog.websockets']) {
                try {
                    // Return cleanup function
                    return listenForNyDialogEvents(() => silentlyHentDialoger(fnr), fnr);
                } catch (e) {
                    // Fallback to http-polling if anything fails
                    return pollWithHttp();
                }
            } else {
                return pollWithHttp();
            }
        }
    }, [klarTilAaPolle, fnr, pollWithHttp]);

    if (
        isDialogPending(dialogstatus) ||
        isPending(brukerstatus) ||
        isPending(oppfolgingstatus) ||
        harLoggetInnNiva4.isPending
    ) {
        return (
            <div className="flex flex-1 justify-center self-center">
                <Loader size="3xlarge" />
            </div>
        );
    } else if (hasError(brukerstatus) || hasError(oppfolgingstatus) || hasDialogError(dialogstatus)) {
        return <Alert variant="error">Noe gikk dessverre galt med systemet. Prøv igjen senere.</Alert>;
    }
    return (
        <DialogContext.Provider value={dialogDataProvider}>
            <OppfolgingContext.Provider value={oppfolgingDataProvider}>
                <HarNivaa4Context.Provider value={harLoggetInnNiva4}>
                    <UserInfoContext.Provider value={bruker}>
                        <AktivitetContext.Provider value={aktivitetDataProvider}>
                            <VeilederDataContext.Provider value={{ veilederNavn }}>
                                <KladdContext.Provider value={kladdDataProvider}>
                                    <FNRContext.Provider value={fnr}>
                                        <ViewStateProvider>
                                            <FeatureToggleContext.Provider value={feature}>
                                                <AktivitetToggleProvider defaultValue={visAktivitetDefault || false}>
                                                    {children}
                                                </AktivitetToggleProvider>
                                            </FeatureToggleContext.Provider>
                                        </ViewStateProvider>
                                    </FNRContext.Provider>
                                </KladdContext.Provider>
                            </VeilederDataContext.Provider>
                        </AktivitetContext.Provider>
                    </UserInfoContext.Provider>
                </HarNivaa4Context.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
