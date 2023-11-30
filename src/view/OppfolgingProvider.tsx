import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { OppfolgingsApi } from '../api/UseApiBasePath';
import { fetchData, fnrQuery } from '../utils/Fetch';
import { OppfolgingData } from '../utils/Typer';
import useSWR, { mutate } from 'swr';
import { getStatus } from '../utils/appStateUtil';

export interface OppfolgingDataProviderType {
    data?: OppfolgingData;
    status: Status;
    hentOppfolging: () => Promise<OppfolgingData | undefined>;
}

interface OppfolgingState {
    data?: OppfolgingData;
    status: Status;
}

const initOppfolgingState: OppfolgingState = {
    data: undefined,
    status: Status.INITIAL
};

export const OppfolgingContext = React.createContext<OppfolgingDataProviderType>({
    data: undefined,
    status: Status.INITIAL,
    hentOppfolging: () => Promise.resolve(undefined)
});
export const useOppfolgingContext = () => useContext(OppfolgingContext);

export const useOppfolgingDataProvider = (fnr?: string) => {
    const query = fnrQuery(fnr);
    const oppfolgingUrl = useMemo(() => OppfolgingsApi.oppfolgingUrl(query), [query]);
    const { data, isLoading, error, isValidating } = useSWR(`oppfolging/${fnr || 'bruker'}`, () =>
        fetchData<OppfolgingData>(oppfolgingUrl)
    );

    return {
        data: data || initOppfolgingState.data,
        status: getStatus(data, isLoading, isValidating, error),
        hentOppfolging: () => mutate(`oppfolging/${fnr || 'bruker'}`)
    };
};
