import React, { useCallback, useContext, useMemo, useState } from 'react';

import { fetchData, fnrQuery } from '../utils/Fetch';
import { valueOrNull } from '../utils/TypeHelper';
import { KladdData, StringOrNull } from '../utils/Typer';
import useApiBasePath from '../utils/UseApiBasePath';

enum Status {
    INITIAL,
    PENDING,
    RELOADING,
    OK,
    ERROR
}

export interface KladdDataProviderType {
    status: Status;
    kladder: KladdData[];
    hentKladder: () => Promise<KladdData[]>;
    oppdaterKladd: (
        _dialogId?: StringOrNull,
        _aktivitetId?: StringOrNull,
        _tema?: StringOrNull,
        _melding?: StringOrNull
    ) => void;
    slettKladd: (dialogId?: StringOrNull, aktivitetId?: StringOrNull) => void;
}

export const KladdContext = React.createContext<KladdDataProviderType>({
    status: Status.INITIAL,
    kladder: [],
    hentKladder: () => Promise.resolve([]),
    oppdaterKladd: (
        _dialogId?: StringOrNull,
        _aktivitetId?: StringOrNull,
        _tema?: StringOrNull,
        _melding?: StringOrNull
    ) => {
        /* do nothing */
    },
    slettKladd: (_dialogId?: StringOrNull, _aktivitetId?: StringOrNull) => {
        /* do nothing */
    }
});

export const useKladdContext = () => useContext(KladdContext);

export interface KladdState {
    status: Status;
    kladder: KladdData[];
}

const initKladdState: KladdState = {
    status: Status.INITIAL,
    kladder: []
};

export function useKladdDataProvider(fnr?: string): KladdDataProviderType {
    const [state, setState] = useState(initKladdState);

    const apiBasePath = useApiBasePath();
    const query = fnrQuery(fnr);

    const baseUrl = useMemo(() => `${apiBasePath}/veilarbdialog/api/kladd${query}`, [apiBasePath, query]);

    const hentKladder = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isKladdReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<KladdData[]>(baseUrl)
            .then((kladder) => {
                setState({ status: Status.OK, kladder: kladder });
                return kladder;
            })
            .catch(() => {
                setState((prevState) => ({ ...prevState, status: Status.ERROR }));
                return [];
            });
    }, [baseUrl, setState]);

    const oppdaterKladd = useCallback(
        (dialogId?: StringOrNull, aktivitetId?: StringOrNull, tema?: StringOrNull, melding?: StringOrNull) => {
            const kladdData: KladdData = {
                dialogId: valueOrNull(dialogId),
                aktivitetId: valueOrNull(aktivitetId),
                overskrift: valueOrNull(tema),
                tekst: valueOrNull(melding)
            };

            setState((prevState) => {
                const kladder = prevState.kladder;
                const ny = [...kladder.filter((k) => !eqKladd(k, dialogId, aktivitetId)), kladdData];
                return { ...prevState, kladder: ny };
            });

            fetchData<void>(baseUrl, {
                method: 'post',
                body: JSON.stringify(kladdData)
            });
        },
        [setState, baseUrl]
    );

    const slettKladd = useCallback(
        (dialogId?: StringOrNull, aktivitetId?: StringOrNull) => {
            setState((prevState) => {
                const kladder = prevState.kladder;
                const ny = kladder.filter((k) => !eqKladd(k, dialogId, aktivitetId));
                return { ...prevState, kladder: ny };
            });
        },
        [setState]
    );

    return useMemo(() => {
        return {
            status: state.status,
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
