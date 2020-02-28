import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Bruker, OppfolgingData } from '../utils/Typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { FetchResult, hasData, hasError, isPending, Status } from '@nutgaard/use-fetch';
import { fnrQuery, getApiBasePath, REQUEST_CONFIG } from '../utils/Fetch';
import { initalState, ViewState } from './ViewState';
import { AktivitetProvider } from './AktivitetProvider';
import { DialogContext, hasDialogError, isDialogPending, useDialogDataProvider } from './DialogProvider';

export const UserInfoContext = React.createContext<Bruker | null>(null);
export const FNRContext = React.createContext<string | undefined>(undefined);

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

export function dataOrUndefined<T>(context: FetchResult<T>): T | undefined {
    return hasData(context) ? context.data : undefined;
}

interface Props {
    fnr?: string;
    children: React.ReactNode;
}

export function Provider(props: Props) {
    const { fnr, children } = props;
    const apiBasePath = getApiBasePath(fnr);
    const query = fnrQuery(fnr);

    const bruker = useFetch<Bruker>(`${apiBasePath}/veilarboppfolging/api/oppfolging/me`, REQUEST_CONFIG);
    const oppfolgingData = useFetch<OppfolgingData>(
        `${apiBasePath}/veilarboppfolging/api/oppfolging${query}`,
        REQUEST_CONFIG
    );
    const [viewState, setState] = useState(initalState);

    const dialogDataProvider = useDialogDataProvider(fnr);
    const hentDialoger = dialogDataProvider.hentDialoger;
    useEffect(() => {
        hentDialoger();
    }, [hentDialoger]);

    if (isDialogPending(dialogDataProvider.status) || isPending(bruker, false) || isPending(oppfolgingData, false)) {
        return <NavFrontendSpinner />;
    } else if (hasError(bruker) || hasError(oppfolgingData) || hasDialogError(dialogDataProvider.status)) {
        return <p>Kunne ikke laste data fra baksystemer. Prøv igjen senere</p>;
    }

    return (
        <DialogContext.Provider value={dialogDataProvider}>
            <OppfolgingContext.Provider value={oppfolgingData}>
                <UserInfoContext.Provider value={bruker.data}>
                    <AktivitetProvider fnr={fnr} apiBasePath={apiBasePath}>
                        <FNRContext.Provider value={fnr}>
                            <ViewContext.Provider value={{ viewState: viewState, setViewState: setState }}>
                                {children}
                            </ViewContext.Provider>
                        </FNRContext.Provider>
                    </AktivitetProvider>
                </UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
