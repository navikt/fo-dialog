import { fetchData } from '../utils/Fetch';
import { createGenericStore } from '../utils/genericStore';

export interface VeilederInfo {
    ident: string;
    navn: string; //etternanvn, fornavn
    fornavn: string;
    etternavn: string;
}

const fetchVeilederNavn = () => fetchData<VeilederInfo>('/veilarbveileder/api/veileder/me');
export const useVeilederNavnStore = createGenericStore(
    undefined as VeilederInfo | undefined,
    fetchVeilederNavn,
    'hente veileder navn'
);
export const useVeilederNavn = () =>
    useVeilederNavnStore((state) => {
        return `${state.data?.fornavn} ${state.data?.etternavn}`;
    });
