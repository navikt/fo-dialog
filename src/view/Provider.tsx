import useFetch, { FetchResult, Status, hasData, hasError, isPending } from '@nutgaard/use-fetch';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import useFetchHarNivaa4, { HarNivaa4Response } from '../api/useFetchHarNivaa4';
import useFetchVeilederNavn from '../api/useHentVeilederData';
import { REQUEST_CONFIG, fnrQuery, getApiBasePath } from '../utils/Fetch';
import { Bruker, OppfolgingData } from '../utils/Typer';
import { AktivitetProvider } from './AktivitetProvider';
import { DialogContext, hasDialogError, isDialogOk, isDialogPending, useDialogDataProvider } from './DialogProvider';
import { KladdContext, useKladdDataProvider } from './KladdProvider';
import styles from './Provider.module.less';
import { ViewState, initalState } from './ViewState';

interface VeilederData {
    veilederNavn?: string;
}

export const UserInfoContext = React.createContext<Bruker | null>(null);
export const FNRContext = React.createContext<string | undefined>(undefined);
export const VeilederDataContext = React.createContext<VeilederData>({});
export const HarNivaa4Context = React.createContext<HarNivaa4Response>({
    harNivaa4: false,
    isPending: false,
    hasError: false
});

function init<T>(): FetchResult<T> {
    return {
        status: Status.INIT,
        statusCode: 0,
        rerun(): void {}
    };
}

export const OppfolgingContext = React.createContext(init<OppfolgingData>());

interface ViewContextType {
    viewState: ViewState;
    setViewState: Dispatch<SetStateAction<ViewState>>;
}

export const ViewContext = React.createContext<ViewContextType>({
    viewState: initalState,
    setViewState: () => {}
});

export const useUserInfoContext = () => useContext(UserInfoContext);
export const useOppfolgingContext = () => useContext(OppfolgingContext);
export const useFnrContext = () => useContext(FNRContext);
export const useViewContext = () => useContext(ViewContext);
export const useVeilederDataContext = () => useContext(VeilederDataContext);
export const useHarNivaa4Context = () => useContext(HarNivaa4Context);

export function dataOrUndefined<T>(context: FetchResult<T>): T | undefined {
    return hasData(context) ? context.data : undefined;
}

interface Props {
    fnr?: string;
    enhet?: string;
    erVeileder: boolean;
    children: React.ReactNode;
}

export function Provider(props: Props) {
    const { fnr, erVeileder, children } = props;
    const apiBasePath = getApiBasePath(fnr);
    const query = fnrQuery(fnr);

    const veilederNavn = useFetchVeilederNavn(erVeileder);
    const bruker = useFetch<Bruker>(`${apiBasePath}/veilarboppfolging/api/oppfolging/me`, REQUEST_CONFIG);
    const oppfolgingData = useFetch<OppfolgingData>(
        `${apiBasePath}/veilarboppfolging/api/oppfolging${query}`,
        REQUEST_CONFIG
    );

    const harLoggetInnNiva4 = useFetchHarNivaa4(erVeileder, fnr);

    const [viewState, setState] = useState(initalState);

    const dialogDataProvider = useDialogDataProvider(fnr);
    const kladdDataProvider = useKladdDataProvider(fnr);

    const { hentDialoger, pollForChanges, status } = dialogDataProvider;
    const hentKladder = kladdDataProvider.hentKladder;

    useEffect(() => {
        hentDialoger();
        hentKladder();
    }, [hentDialoger, hentKladder]);

    useEffect(() => {
        if (isDialogOk(status) && hasData(bruker)) {
            //stop interval when encountering error
            if (bruker.data.erBruker) {
                let interval: NodeJS.Timeout;
                interval = setInterval(() => pollForChanges().catch(() => clearInterval(interval)), 10000);
                return () => clearInterval(interval);
            }
        }
    }, [status, bruker, pollForChanges]);

    if (
        isDialogPending(status) ||
        isPending(bruker, false) ||
        isPending(oppfolgingData, false) ||
        harLoggetInnNiva4.isPending
    ) {
        return <NavFrontendSpinner />;
    } else if (hasError(bruker) || hasError(oppfolgingData) || hasDialogError(status)) {
        return (
            <AlertStripeFeil className={styles.feil}>
                Noe gikk dessverre galt med systemet. Prøv igjen senere.
            </AlertStripeFeil>
        );
    }

    return (
        <DialogContext.Provider value={dialogDataProvider}>
            <OppfolgingContext.Provider value={oppfolgingData}>
                <HarNivaa4Context.Provider value={harLoggetInnNiva4}>
                    <UserInfoContext.Provider value={bruker.data}>
                        <AktivitetProvider fnr={fnr} apiBasePath={apiBasePath}>
                            <VeilederDataContext.Provider value={{ veilederNavn }}>
                                <KladdContext.Provider value={kladdDataProvider}>
                                    <FNRContext.Provider value={fnr}>
                                        <ViewContext.Provider value={{ viewState: viewState, setViewState: setState }}>
                                            {children}
                                        </ViewContext.Provider>
                                    </FNRContext.Provider>
                                </KladdContext.Provider>
                            </VeilederDataContext.Provider>
                        </AktivitetProvider>
                    </UserInfoContext.Provider>
                </HarNivaa4Context.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
