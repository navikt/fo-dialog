import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { fetchData } from '../utils/Fetch';
import { Bruker } from '../utils/Typer';
import { baseApiPath } from '../utils/UseApiBasePath';
import { useFnrContext } from './Provider';

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

export const useBrukerDataProvider = (): BrukerDataProviderType => {
    const [state, setState] = useState<BrukerDataProviderType>(initBrukerState);

    const fnr = useFnrContext();
    const [apiBasePath, setApiBasePath] = useState(baseApiPath(!!fnr));
    useEffect(() => {
        setApiBasePath(baseApiPath(!!fnr));
    }, [fnr]);

    const apiUrl = useMemo(() => `${apiBasePath}/veilarboppfolging/api/oppfolging/me`, [apiBasePath]);

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
    }, [apiUrl]);

    return {
        data: state.data,
        status: state.status,
        error: state.error
    };
};
