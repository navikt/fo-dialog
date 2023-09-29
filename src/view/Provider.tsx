import { Alert, Loader } from '@navikt/ds-react';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { Status, hasData, hasError, isPending } from '../api/typer';
import useFetchHarNivaa4, { HarNivaa4Response } from '../api/useFetchHarNivaa4';
import useFetchVeilederNavn from '../api/useHentVeilederData';
import { AktivitetContext, useAktivitetDataProvider } from './AktivitetProvider';
import { AktivitetToggleProvider } from './AktivitetToggleContext';
import { BrukerDataProviderType, UserInfoContext, useBrukerDataProvider } from './BrukerProvider';
import { DialogContext, hasDialogError, isDialogOk, isDialogPending, useDialogDataProvider } from './DialogProvider';
import { FeatureToggleContext, useFeatureToggleProvider } from '../featureToggle/FeatureToggleProvider';
import { KladdContext, useKladdDataProvider } from './KladdProvider';
import { OppfolgingContext, useOppfolgingDataProvider } from './OppfolgingProvider';
import { ViewState, initalState } from './ViewState';

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

interface ViewContextType {
    viewState: ViewState;
    setViewState: Dispatch<SetStateAction<ViewState>>;
}

export const ViewContext = React.createContext<ViewContextType>({
    viewState: initalState,
    setViewState: () => {
        /* do nothing */
    }
});

export const useFnrContext = () => useContext(FNRContext);
export const useViewContext = () => useContext(ViewContext);
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

    const [viewState, setState] = useState(initalState);

    const dialogDataProvider = useDialogDataProvider(fnr);
    const aktivitetDataProvider = useAktivitetDataProvider(fnr);
    const kladdDataProvider = useKladdDataProvider(fnr);

    const { hentDialoger, pollForChanges, status: dialogstatus } = dialogDataProvider;
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

    useEffect(() => {
        if (isDialogOk(dialogstatus) && hasData(brukerstatus)) {
            //stop interval when encountering error
            if (bruker) {
                let interval: NodeJS.Timeout;
                interval = setInterval(() => pollForChanges().catch(() => clearInterval(interval)), 10000);
                return () => clearInterval(interval);
            }
        }
    }, [dialogstatus, bruker, brukerstatus, pollForChanges]);

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
                                        <ViewContext.Provider value={{ viewState: viewState, setViewState: setState }}>
                                            <FeatureToggleContext.Provider value={feature}>
                                                <AktivitetToggleProvider defaultValue={visAktivitetDefault || false}>
                                                    {children}
                                                </AktivitetToggleProvider>
                                            </FeatureToggleContext.Provider>
                                        </ViewContext.Provider>
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
