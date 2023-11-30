import React, { useContext, useEffect, useState } from 'react';

import { Status, isReloading } from '../api/typer';
import { OppfolgingsApi } from '../api/UseApiBasePath';
import { fetchData } from '../utils/Fetch';
import { Bruker } from '../utils/Typer';
import useSWR from 'swr';
import { getStatus } from '../utils/appStateUtil';

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
export const useBrukerDataProvider = (fnr?: string): BrukerDataProviderType => {
    const { data, error, isLoading, isValidating } = useSWR(`brukerData/${fnr || 'bruker'}`, () =>
        fetchData<Bruker>(apiUrl)
    );
    return {
        data: data || initBrukerState.data,
        status: getStatus(data, isLoading, isValidating, error),
        error: error
    };
};
