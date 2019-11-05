import React, { PropsWithChildren, useContext } from 'react';
import { Bruker, DialogData, OppfolgingData } from '../utils/Typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { FetchResult, Status, isPending, hasError } from '@nutgaard/use-fetch';

export const UserInfoContext = React.createContext<Bruker | null>(null);
export const OppfolgingContext = React.createContext<OppfolgingData | null>(null);
export const DialogContext = React.createContext<FetchResult<DialogData[]>>({
    status: Status.INIT,
    statusCode: 0,
    rerun(): void {}
});
export const useUserInfoContext = () => useContext(UserInfoContext);
export const useOppfolgingContext = () => useContext(OppfolgingContext);
export const useDialogContext = () => useContext(DialogContext);

export function Provider(props: PropsWithChildren<{}>) {
    const bruker = useFetch<Bruker>('/veilarboppfolging/api/oppfolging/me');
    const oppfolgingData = useFetch<OppfolgingData>('/veilarboppfolging/api/oppfolging');
    const dialoger = useFetch<DialogData[]>('/veilarbdialog/api/dialog');

    if (isPending(bruker) || isPending(oppfolgingData) || isPending(dialoger)) {
        return <NavFrontendSpinner />;
    } else if (hasError(bruker) || hasError(oppfolgingData) || hasError(dialoger)) {
        return <p>Kunne ikke laste data fra baksystemer. Prøv igjen senere</p>;
    }

    return (
        <DialogContext.Provider value={dialoger}>
            <OppfolgingContext.Provider value={oppfolgingData.data}>
                <UserInfoContext.Provider value={bruker.data}>{props.children}</UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
