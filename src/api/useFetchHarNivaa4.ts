import { fetchData } from '../utils/Fetch';
import useSWR from 'swr';

interface HarLoggetInnNiva4 {
    harbruktnivaa4: boolean;
}

export interface HarNivaa4Response {
    harNivaa4: boolean;
    hasError: boolean;
    isPending: boolean;
}

const useFetchHarNivaa4 = (erVeileder: boolean, fnr?: string): HarNivaa4Response => {
    const { data, isLoading, error } = useSWR(`harNivaa4/${fnr}`, (): Promise<boolean> => {
        if (erVeileder) {
            return fetchData<HarLoggetInnNiva4>(`/veilarbperson/api/person/${fnr}/harNivaa4`).then(
                (response) => response.harbruktnivaa4
            );
        } else {
            return Promise.resolve(true);
        }
    });

    return { harNivaa4: data || false, hasError: !!error, isPending: isLoading };
};

export default useFetchHarNivaa4;
