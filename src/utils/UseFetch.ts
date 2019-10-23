import { Reducer, ReducerState, useEffect, useReducer, useState } from 'react';

export enum Status {
    INIT = 'INIT',
    LOADING = 'LOADING',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR',
    OK = 'OK'
}
type FetchActionInit = { type: 'FETCH_INIT' };
type FetchActionOk<TYPE> = { type: 'FETCH_OK'; data: TYPE };
type FetchActionError = { type: 'FETCH_ERROR' };
type FetchActions<TYPE> = FetchActionInit | FetchActionError | FetchActionOk<TYPE>;

type FetchData<TYPE> = {
    status: Status;
    data: TYPE | null;
};
type FetchReducer<TYPE> = Reducer<FetchData<TYPE>, FetchActions<TYPE>>;
const initalState: FetchData<any> = {
    status: Status.INIT,
    data: null
};

function fetchReducer<TYPE>(state: FetchData<TYPE>, action: FetchActions<TYPE>): FetchData<TYPE> {
    switch (action.type) {
        case 'FETCH_INIT':
            if (state.status === Status.INIT) {
                return { ...state, status: Status.LOADING };
            }
            return { ...state, status: Status.RELOADING };
        case 'FETCH_ERROR':
            return { ...state, status: Status.ERROR };
        case 'FETCH_OK':
            return { data: action.data, status: Status.OK };
    }
}

export type UseFetchHook<TYPE> = ReducerState<FetchReducer<TYPE>> & {
    refetch(): void;
};

export const initalData: UseFetchHook<any> = {
    ...initalState,
    refetch() {}
};

export default function UseFetch<TYPE>(url: RequestInfo, option?: RequestInit): UseFetchHook<TYPE> {
    const [rerun, setRerun] = useState(0);
    const [state, dispatch] = useReducer<FetchReducer<TYPE>>(fetchReducer, initalState);

    useEffect(() => {
        let didCancel = false;

        async function fetchData() {
            dispatch({ type: 'FETCH_INIT' });
            try {
                const response = await fetch(url, option);
                const json = await response.json();
                if (!didCancel) {
                    dispatch({ type: 'FETCH_OK', data: json });
                }
            } catch (e) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_ERROR' });
                }
                throw e;
            }
        }

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [url, option, rerun]);

    function refetch() {
        setRerun(rerun + 1);
    }

    return { ...state, refetch };
}
