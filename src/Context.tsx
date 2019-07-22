import React, { PropsWithChildren, useContext } from 'react';
import { Bruker, DialogData, OppfolgingData } from './utils/typer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import useFetch, { FetchResult, Status, isPending, hasError, WithData } from '@nutgaard/use-fetch';

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

    const apier: Array<FetchResult<any>> = [bruker, oppfolgingData, dialoger];

    if (apier.some(api => isPending(api))) {
        return <NavFrontendSpinner />;
    } else if (apier.some(api => hasError(api))) {
        return <p>Noe alvorlig gikk galt... :(</p>;
    }

    const lastet = coersiveGetData({ bruker, oppfolgingData, dialoger });

    return (
        <DialogContext.Provider value={dialoger}>
            <OppfolgingContext.Provider value={lastet.oppfolgingData.data}>
                <UserInfoContext.Provider value={lastet.bruker.data}>{props.children}</UserInfoContext.Provider>
            </OppfolgingContext.Provider>
        </DialogContext.Provider>
    );
}

// TODO fjern bare det kommer utilities fra use-fetch biblioteket
type Mapped<S, T> = { [P in keyof S]: T };
type Object<T> = { [key: string]: T };
function coersiveGetData<CONFIG extends Object<FetchResult<any>>>(config: CONFIG): Mapped<CONFIG, WithData<any>> {
    return config as Mapped<CONFIG, WithData<any>>;
}
