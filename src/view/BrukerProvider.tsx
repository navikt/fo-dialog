import { useCallback, useMemo, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { fetchData, fnrQuery, getApiBasePath } from '../utils/Fetch';
import { Bruker } from '../utils/Typer';

export interface BrukerDataProviderType {
    data: Bruker;
    status: Status;
}

const initBrukerState: BrukerDataProviderType = {
    data: {} as Bruker,
    status: Status.INITIAL
};

export const useBrukerDataProvider = (fnr?: string): BrukerDataProviderType => {
    const [state, setState] = useState<BrukerDataProviderType>(initBrukerState);

    const apiBasePath = getApiBasePath(fnr);
    const oppfolgingUrl = useMemo(() => `${apiBasePath}/veilarboppfolging/api/oppfolging/me`, [apiBasePath]);

    const hentBruker: () => Promise<Bruker> = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<Bruker>(oppfolgingUrl)
            .then((bruker) => {
                setState({
                    status: Status.OK,
                    data: bruker
                });
                return bruker;
            })
            .catch(() => {
                setState((prevState) => ({
                    ...prevState,
                    status: Status.ERROR
                }));
                return {} as Bruker;
            });
    }, [oppfolgingUrl]);

    return state;
};
