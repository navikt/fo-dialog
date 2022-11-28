import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { fetchData } from '../utils/Fetch';
import { Bruker } from '../utils/Typer';
import useApiBasePath from '../utils/UseApiBasePath';

export interface BrukerDataProviderType {
    data: Bruker | null;
    status: Status;
}

const initBrukerState: BrukerDataProviderType = {
    data: null,
    status: Status.INITIAL
};

export const UserInfoContext = React.createContext<Bruker | null>(null);
export const useUserInfoContext = () => useContext(UserInfoContext);

export const useBrukerDataProvider = (): BrukerDataProviderType => {
    const [state, setState] = useState<BrukerDataProviderType>(initBrukerState);

    const apiBasePath = useApiBasePath();
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
            .catch(() => {
                setState((prevState) => ({
                    ...prevState,
                    status: Status.ERROR
                }));
            });
    }, [apiUrl]);

    return {
        data: state.data,
        status: state.status
    };
};
