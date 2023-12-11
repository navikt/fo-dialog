import { fetchData } from '../utils/Fetch';
import useSWR from 'swr';

interface VeilederInfo {
    ident: string;
    navn: string; //etternanvn, fornavn
    fornavn: string;
    etternavn: string;
}

const useFetchVeilederNavn = (erVeileder: boolean) => {
    const { data } = useSWR('veileder/me', () => {
        if (erVeileder) {
            return fetchData<VeilederInfo>('/veilarbveileder/api/veileder/me')
                .then((veilerder) => `${veilerder.fornavn} ${veilerder.etternavn}`)
                .catch();
        }
        return undefined;
    });
    return data;
};

export default useFetchVeilederNavn;
