import { fetchData } from '../utils/Fetch';
import { createGenericStore } from '../utils/genericStore';

export const fetchInnsynsrett = (fnr : string | undefined) =>
     fetchData<Innsynsrett>(`veilarbaktivitet/api/innsynsrett`, {
         method : 'POST',
         body: JSON.stringify({fnr})
     });


interface Innsynsrett{
    foresatteHarInnsynsrett: boolean;
}

export const useInnsynsrettStore = createGenericStore(undefined as Innsynsrett | undefined, fetchInnsynsrett);

export const useInnsynsrett= () =>
    useInnsynsrettStore((state) => {
        return state.data?.foresatteHarInnsynsrett;
    });