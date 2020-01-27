import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Bruker, DialogData, OppfolgingData } from '../utils/Typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { FetchResult, hasData, hasError, isPending, Status } from '@nutgaard/use-fetch';
import { fnrQuery } from '../utils/Fetch';
import { initalState, ViewState } from './ViewState';
import { AktivitetProvider } from './AktivitetProvider';

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
export const DialogContext = React.createContext(init<DialogData[]>());

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
    const [viewState, setState] = useState(initalState);

    //Todo remove usefetch and use our own thing here. rerun need to be a promise
    if (isPending(bruker, false) || isPending(oppfolgingData, false) || isPending(dialoger, false)) {
        return <NavFrontendSpinner />;
    } else if (hasError(bruker) || hasError(oppfolgingData) || hasError(dialoger)) {
        return <p>Kunne ikke laste data fra baksystemer. Prøv igjen senere</p>;
    }

    return (
        <DialogContext.Provider value={dialoger}>
            <OppfolgingContext.Provider value={oppfolgingData}>
                <UserInfoContext.Provider value={bruker.data}>
                    <AktivitetProvider fnr={props.fnr}>
                        <FNRContext.Provider value={props.fnr}>
                            <ViewContext.Provider value={{ viewState: viewState, setViewState: setState }}>
                                {props.children}
                            </ViewContext.Provider>
                        </FNRContext.Provider>
                    </AktivitetProvider>
                </UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
