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
    hentKladder: () => Promise<KladdData[]>;
    oppdaterKladd: (
        _dialogId?: StringOrNull,
        _aktivitetId?: StringOrNull,
        _tema?: StringOrNull,
        _melding?: StringOrNull
    ) => void;
    slettKladd: (dialogId?: StringOrNull, aktivitetId?: StringOrNull) => void;
}

export const KladdContext = React.createContext<KladdDataContext>({
    status: Status.INITIAL,
    oppdaterStatus: Status.INITIAL,
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
    oppdaterStatus: Status;
    kladder: KladdData[];
}

const initKladdState: KladdState = {
    status: Status.INITIAL,
    oppdaterStatus: Status.INITIAL,
    kladder: []
};

export function useKladdDataProvider(fnr?: string): KladdDataContext {
    const [state, setState] = useState(initKladdState);

    const query = fnrQuery(fnr);
    const kladdUrl = useMemo(() => DialogApi.kladd(query), [query]);

    const hentKladder = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            status: isKladdReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<KladdData[]>(kladdUrl)
            .then((kladder) => {
                setState((prevState) => ({ ...prevState, status: Status.OK, kladder: kladder }));
                return kladder;
            })
            .catch(() => {
                setState((prevState) => ({ ...prevState, status: Status.ERROR }));
                return [];
            });
    }, [kladdUrl, setState]);

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
                return { ...prevState, kladder: ny, oppdaterStatus: Status.RELOADING };
            });

            fetchData<void>(kladdUrl, {
                method: 'post',
                body: JSON.stringify(kladdData)
            })
                .then(() => {
                    setState((prevState) => ({ ...prevState, oppdaterStatus: Status.OK }));
                })
                .catch(() => {
                    setState((prevState) => ({ ...prevState, oppdaterStatus: Status.OK }));
                });
        },
        [setState, kladdUrl]
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
