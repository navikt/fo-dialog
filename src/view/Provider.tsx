import React, { Dispatch, useContext, useReducer } from 'react';
import { Bruker, DialogData, OppfolgingData } from '../utils/Typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { FetchResult, hasData, hasError, isPending, Status } from '@nutgaard/use-fetch';
import { useFetchAktivitet } from '../api/UseAktivitet';
import { fnrQuery } from '../utils/Fetch';
import { Action, initalState, reducer, ViewState } from './ViewState';

export const UserInfoContext = React.createContext<Bruker | null>(null);
export const FNRContext = React.createContext<string | undefined>(undefined);
export const OppfolgingContext = React.createContext<FetchResult<OppfolgingData>>({
    status: Status.INIT,
    statusCode: 0,
    rerun(): void {}
});
export const DialogContext = React.createContext<FetchResult<DialogData[]>>({
    status: Status.INIT,
    statusCode: 0,
    rerun(): void {}
});

interface ViewContextType {
    state: ViewState;
    dispatch: Dispatch<Action>;
}

export const ViewContext = React.createContext<ViewContextType>({
    state: initalState,
    dispatch: () => {}
});

export const useUserInfoContext = () => useContext(UserInfoContext);
export const useOppfolgingContext = () => useContext(OppfolgingContext);
export const useDialogContext = () => useContext(DialogContext);
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
    const query = fnrQuery(props.fnr);

    const bruker = useFetch<Bruker>('/veilarboppfolging/api/oppfolging/me');
    const oppfolgingData = useFetch<OppfolgingData>('/veilarboppfolging/api/oppfolging' + query);
    const dialoger = useFetch<DialogData[]>('/veilarbdialog/api/dialog' + query);
    const [viewState, dispatch] = useReducer(reducer, initalState);

    useFetchAktivitet(props.fnr);

    if (isPending(bruker, false) || isPending(oppfolgingData, false) || isPending(dialoger, false)) {
        return <NavFrontendSpinner />;
    } else if (hasError(bruker) || hasError(oppfolgingData) || hasError(dialoger)) {
        return <p>Kunne ikke laste data fra baksystemer. Prøv igjen senere</p>;
    }

    return (
        <DialogContext.Provider value={dialoger}>
            <OppfolgingContext.Provider value={oppfolgingData}>
                <UserInfoContext.Provider value={bruker.data}>
                    <FNRContext.Provider value={props.fnr}>
                        <ViewContext.Provider value={{ state: viewState, dispatch: dispatch }}>
                            {props.children}
                        </ViewContext.Provider>
                    </FNRContext.Provider>
                </UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
