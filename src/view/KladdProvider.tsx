import React, { useCallback, useContext, useMemo, useState } from 'react';

import { DialogApi } from '../api/UseApiBasePath';
import { fetchData, fnrQuery } from '../utils/Fetch';
import { valueOrNull } from '../utils/TypeHelper';
import { KladdData, StringOrNull } from '../utils/Typer';

enum Status {
    INITIAL,
    PENDING,
    RELOADING,
    OK,
    ERROR
}

export interface KladdDataContext {
    status: Status;
    oppdaterStatus: Status;
    kladder: KladdData[];
    hentKladder: (fnr: string | undefined) => Promise<KladdData[]>;
    oppdaterKladd: (fnr: string | undefined, kladdData: KladdData) => void;
    slettKladd: (dialogId?: StringOrNull, aktivitetId?: StringOrNull) => void;
}

export const KladdContext = React.createContext<KladdDataContext>({
    status: Status.INITIAL,
    oppdaterStatus: Status.INITIAL,
    kladder: [],
    hentKladder: (fnr) => Promise.resolve([]),
    oppdaterKladd: (fnr, kladdData) => {
        /* do nothing */
    },
    slettKladd: (_dialogId, _aktivitetId) => {
        /* do nothing */
    }
});

export const useKladdContext = () => useContext(KladdContext);

export interface KladdState {
    status: Status;
    oppdaterStatus: Status;
    kladder: KladdData[];
}

const initKladdState: KladdState = {
    status: Status.INITIAL,
    oppdaterStatus: Status.INITIAL,
    kladder: []
};

export function useKladdDataProvider(): KladdDataContext {
    const [state, setState] = useState(initKladdState);
    const hentKladder = (fnr: string | undefined) => {
        setState((prevState) => ({
            ...prevState,
            status: isKladdReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<KladdData[]>(DialogApi.kladd(fnrQuery(fnr)))
            .then((kladder) => {
                setState((prevState) => ({ ...prevState, status: Status.OK, kladder: kladder }));
                return kladder;
            })
            .catch(() => {
                setState((prevState) => ({ ...prevState, status: Status.ERROR }));
                return [];
            });
    };

    const oppdaterKladd = (fnr: string | undefined, kladdData: KladdData) => {
        const { dialogId, aktivitetId } = kladdData;
        setState((prevState) => {
            const kladder = prevState.kladder;
            const ny = [...kladder.filter((k) => !eqKladd(k, dialogId, aktivitetId)), kladdData];
            return { ...prevState, kladder: ny, oppdaterStatus: Status.RELOADING };
        });

        fetchData<void>(DialogApi.kladd(fnrQuery(fnr)), {
            method: 'post',
            body: JSON.stringify(kladdData)
        })
            .then(() => {
                setState((prevState) => ({ ...prevState, oppdaterStatus: Status.OK }));
            })
            .catch(() => {
                setState((prevState) => ({ ...prevState, oppdaterStatus: Status.OK }));
            });
    };

    const slettKladd = (dialogId?: StringOrNull, aktivitetId?: StringOrNull) => {
        setState((prevState) => {
            const kladder = prevState.kladder;
            const ny = kladder.filter((k) => !eqKladd(k, dialogId, aktivitetId));
            return { ...prevState, kladder: ny };
        });
    };

    return useMemo(() => {
        return {
            status: state.status,
            oppdaterStatus: state.oppdaterStatus,
            kladder: state.kladder,
            hentKladder,
            oppdaterKladd,
            slettKladd
        };
    }, [state, hentKladder, oppdaterKladd, slettKladd]);
}

function isKladdReloading(status: Status) {
    return status === Status.OK || status === Status.RELOADING;
}

export function eqKladd(kladd: KladdData, dialogId?: StringOrNull, aktivitetId?: StringOrNull): boolean {
    const dId = valueOrNull(dialogId);
    const aId = valueOrNull(aktivitetId);

    if (!!dialogId) {
        return kladd.dialogId === dId;
    }

    return kladd.dialogId === null && kladd.aktivitetId === aId;
}

export function findKladd(
    kladder: KladdData[],
    dialogId?: StringOrNull,
    aktivitetId?: StringOrNull
): KladdData | undefined {
    return kladder.find((k) => eqKladd(k, dialogId, aktivitetId));
}
