import { Alert, Loader } from '@navikt/ds-react';
import React, { useContext, useEffect } from 'react';

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

    const { data: feature } = useFeatureToggleProvider();
    const { data: bruker, status: brukerstatus }: BrukerDataProviderType = useBrukerDataProvider(fnr);
    const oppfolgingDataProvider = useOppfolgingDataProvider(fnr);
    const { status: oppfolgingstatus, hentOppfolging } = oppfolgingDataProvider;

    const harLoggetInnNiva4 = useFetchHarNivaa4(erVeileder, fnr);

    const dialogDataProvider = useDialogDataProvider(fnr);
    const aktivitetDataProvider = useAktivitetDataProvider(fnr);
    const kladdDataProvider = useKladdDataProvider(fnr);

    const { hentDialoger, pollForChanges, status: dialogstatus, silentlyHentDialoger } = dialogDataProvider;
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
        hentDialoger();
        hentKladder();
    }, [hentDialoger, hentKladder]);

    const brukerStatusErLastet = hasData(brukerstatus);
    const dialogStatusOk = hasData(dialogstatus);
    useEffect(() => {
        if (dialogStatusOk && brukerStatusErLastet) {
            //stop interval when encountering error
            const pollWithHttp = () => {
                let interval: NodeJS.Timeout;
                interval = setInterval(() => pollForChanges().catch(() => clearInterval(interval)), 10000);
                return () => clearInterval(interval);
            };

            if (bruker?.erBruker) {
                pollWithHttp();
            } else if (bruker?.erVeileder) {
                if (feature['arbeidsrettet-dialog.websockets']) {
                    return listenForNyDialogEvents(silentlyHentDialoger, fnr);
                } else {
                    pollWithHttp();
                }
            }
        }
    }, [dialogStatusOk, bruker, brukerStatusErLastet, pollForChanges]);

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
