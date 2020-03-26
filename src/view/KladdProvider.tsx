import React, { useCallback, useContext, useMemo, useState } from 'react';
import { DialogData, KladdData, StringOrNull } from '../utils/Typer';
import { fetchData, fnrQuery, getApiBasePath } from '../utils/Fetch';

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
        dialogId: StringOrNull,
        aktivitetId: StringOrNull,
        tema: StringOrNull,
        melding: StringOrNull
    ) => void;
}

export const KladdContext = React.createContext<KladdDataProviderType>({
    status: Status.INITIAL,
    kladder: [],
    hentKladder: () => Promise.resolve([]),
    oppdaterKladd: (dialogId: StringOrNull, aktivitetId: StringOrNull, tema: StringOrNull, melding: StringOrNull) => {}
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

    const apiBasePath = getApiBasePath(fnr);
    const query = fnrQuery(fnr);

    const baseUrl = useMemo(() => `${apiBasePath}/veilarbdialog/api/kladd${query}`, [apiBasePath, query]);

    const hentKladder = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            status: isKladdReloading(prevState.status) ? Status.RELOADING : Status.PENDING
        }));
        return fetchData<KladdData[]>(baseUrl)
            .then(kladder => {
                setState({ status: Status.OK, kladder: kladder });
                return kladder;
            })
            .catch(() => {
                setState(prevState => ({ ...prevState, status: Status.ERROR }));
                return [];
            });
    }, [baseUrl, setState]);

    const oppdaterKladd = useCallback(
        (dialogId: StringOrNull, aktivitetId: StringOrNull, tema: StringOrNull, melding: StringOrNull) => {
            const kladdData: KladdData = {
                dialogId: dialogId,
                overskrift: tema,
                tekst: melding,
                aktivitetId: aktivitetId
            };

            setState(prevState => {
                const kladder = prevState.kladder;
                const ny = [
                    ...kladder.filter(k => !(k.dialogId === dialogId && k.aktivitetId === aktivitetId)),
                    kladdData
                ];
                return { status: Status.OK, kladder: ny };
            });

            fetchData<DialogData>(baseUrl, {
                method: 'post',
                body: JSON.stringify(kladdData)
            });
        },
        [setState, baseUrl]
    );

    return useMemo(() => {
        return {
            status: state.status,
            kladder: state.kladder,
            hentKladder,
            oppdaterKladd
        };
    }, [state, hentKladder, oppdaterKladd]);
}

function isKladdReloading(status: Status) {
    return status === Status.OK || status === Status.RELOADING;
}
