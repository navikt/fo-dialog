import React, { useContext } from 'react';
import { Bruker, DialogData, OppfolgingData } from './utils/typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { initalData, Status, UseFetchHook } from './utils/use-fetch';

export const UserInfoContext = React.createContext<Bruker | null>(null);
export const OppfolgingContext = React.createContext<OppfolgingData | null>(null);
export const DialogContext = React.createContext<UseFetchHook<DialogData[]>>(initalData);
export const useUserInfoContext = () => useContext(UserInfoContext);
export const useOppfolgingContext = () => useContext(OppfolgingContext);
export const useDialogContext = () => useContext(DialogContext);

interface ProviderData {
    children(bruker: Bruker, oppfolgingdata: OppfolgingData, dialoger: UseFetchHook<DialogData[]>): React.ReactNode;
}

export function Provider(props: ProviderData) {
    const bruker = useFetch<Bruker>('/veilarboppfolging/api/oppfolging/me');
    const oppfolgingData = useFetch<OppfolgingData>('/veilarboppfolging/api/oppfolging');
    const dialoger = useFetch<DialogData[]>('/veilarbdialog/api/dialog');

    const apier: Array<UseFetchHook<any>> = [bruker, oppfolgingData, dialoger];

    if (apier.some(api => [Status.INIT, Status.LOADING].includes(api.status))) {
        return <NavFrontendSpinner />;
    }

    return (
        <DialogContext.Provider value={dialoger}>
            <OppfolgingContext.Provider value={oppfolgingData.data}>
                <UserInfoContext.Provider value={bruker.data}>
                    {props.children(bruker.data!, oppfolgingData.data!, dialoger)}
                </UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}
