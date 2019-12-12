import React, { useContext } from 'react';
import { Bruker, DialogData, OppfolgingData } from '../utils/Typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { FetchResult, hasData, hasError, isPending, Status } from '@nutgaard/use-fetch';
import { useFetchAktivitet } from '../api/UseAktivitet';
import { fnrQuery } from '../utils/Fetch';

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
export const useUserInfoContext = () => useContext(UserInfoContext);
export const useOppfolgingContext = () => useContext(OppfolgingContext);
export const useDialogContext = () => useContext(DialogContext);
export const useFnrContext = () => useContext(FNRContext);

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
                    <FNRContext.Provider value={props.fnr}>{props.children}</FNRContext.Provider>
                </UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
