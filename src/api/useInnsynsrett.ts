import { fetchData } from '../utils/Fetch';
import { createGenericStore } from '../utils/genericStore';


export const fetchInnsynsrett = () =>
     fetchData<Innsynsrett>(`veilarbaktivitet/api/ekstern/innsynsrett`);

interface Innsynsrett{
    foresatteHarInnsynsrett: boolean;
}

export const useInnsynsrettStore = createGenericStore(undefined as Innsynsrett | undefined, fetchInnsynsrett);

export const useInnsynsrett= () =>
    useInnsynsrettStore((state) => {
        return state.data?.foresatteHarInnsynsrett;
    });
