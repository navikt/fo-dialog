import React, { useContext, useEffect, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { OppfolgingsApi } from '../api/UseApiBasePath';
import { fetchData } from '../utils/Fetch';
import { Bruker } from '../utils/Typer';

export interface BrukerDataProviderType {
    data: Bruker | null;
    status: Status;
    error?: string;
}

const initBrukerState: BrukerDataProviderType = {
    data: null,
    status: Status.INITIAL
};

export const UserInfoContext = React.createContext<Bruker | null>(null);
export const useUserInfoContext = () => useContext(UserInfoContext);
const apiUrl = OppfolgingsApi.me;
export const useBrukerDataProvider = (): BrukerDataProviderType => {
    const [state, setState] = useState<BrukerDataProviderType>(initBrukerState);
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            status: isReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        fetchData<Bruker>(apiUrl)
            .then((bruker) => {
                setState({
                    data: bruker,
                    status: Status.OK
                });
            })
            .catch((e) => {
                setState((prevState) => ({
                    ...prevState,
                    error: e,
                    status: Status.ERROR
                }));
            });
    }, []);
    return {
        data: state.data,
        status: state.status,
        error: state.error
    };
};
