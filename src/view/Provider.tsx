import React, { Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Bruker, DialogData, OppfolgingData } from '../utils/Typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { FetchResult, Status, isPending, hasError, hasData } from '@nutgaard/use-fetch';
import { Action, initalState, reducer, ViewState } from './ViewState';
import { useFindAktivitet } from '../api/UseAktivitet';

export const UserInfoContext = React.createContext<Bruker | null>(null);
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

export const useViewContext = () => useContext(ViewContext);

export function dataOrUndefined<T>(context: FetchResult<T>): T | undefined {
    return hasData(context) ? context.data : undefined;
}

export function Provider(props: PropsWithChildren<{}>) {
    const bruker = useFetch<Bruker>('/veilarboppfolging/api/oppfolging/me');
    const oppfolgingData = useFetch<OppfolgingData>('/veilarboppfolging/api/oppfolging');
    const dialoger = useFetch<DialogData[]>('/veilarbdialog/api/dialog');
    const [viewState, dispatch] = useReducer(reducer, initalState);

    useFindAktivitet();

    if (isPending(bruker, false) || isPending(oppfolgingData, false) || isPending(dialoger, false)) {
        return <NavFrontendSpinner />;
    } else if (hasError(bruker) || hasError(oppfolgingData) || hasError(dialoger)) {
        return <p>Kunne ikke laste data fra baksystemer. Prøv igjen senere</p>;
    }

    return (
        <DialogContext.Provider value={dialoger}>
            <OppfolgingContext.Provider value={oppfolgingData}>
                <UserInfoContext.Provider value={bruker.data}>
                    <ViewContext.Provider value={{ state: viewState, dispatch: dispatch }}>
                        {props.children}
                    </ViewContext.Provider>
                </UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
