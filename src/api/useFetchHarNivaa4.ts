import { useEffect, useState } from 'react';
import { fetchData } from '../utils/Fetch';

interface HarLoggetInnNiva4 {
    harbruktnivaa4: boolean;
}

export interface HarNivaa4Response {
    harNivaa4: boolean;
    hasError: boolean;
    isPending: boolean;
}

const useFetchHarNivaa4 = (erVeileder: boolean, fnr?: string): HarNivaa4Response => {
    const [harNivaa4, setHarNivaa4] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        if (erVeileder) {
            fetchData<HarLoggetInnNiva4>(`/veilarbperson/api/person/${fnr}/harNivaa4`)
                .then((response) => setHarNivaa4(response.harbruktnivaa4))
                .catch(() => setHasError(true))
                .then(() => setIsPending(false));
        } else {
            setIsPending(false);
            setHarNivaa4(true);
        }
    }, [erVeileder, fnr]);

    return { harNivaa4, hasError, isPending };
};

export default useFetchHarNivaa4;
