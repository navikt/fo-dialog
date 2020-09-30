import { useEffect, useState } from 'react';
import { fetchData } from '../utils/Fetch';

interface VeilederInfo {
    ident: string;
    navn: string; //etternanvn, fornavn
    fornavn: string;
    etternavn: string;
}

const useFetchVeilederNavn = (erVeileder: boolean) => {
    const [veilederNavn, setVeilederNavn] = useState<string | undefined>();

    useEffect(() => {
        if (erVeileder) {
            fetchData<VeilederInfo>('/veilarbveileder/api/veileder/me')
                .then((veilerder) => setVeilederNavn(`${veilerder.fornavn} ${veilerder.etternavn}`))
                .catch();
        }
    }, [erVeileder]);

    return veilederNavn;
};

export default useFetchVeilederNavn;
