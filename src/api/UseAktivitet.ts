import useFetch, { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import { Aktivitet, ArenaAktivitet } from '../utils/AktivitetTypes';
import { StringOrNull } from '../utils/Typer';
import { fnrQuery } from '../utils/Fetch';
import { useFnrContext } from '../view/Provider';

type mabyAktivitet = Aktivitet | ArenaAktivitet | undefined;
interface AktivitetResponse {
    aktiviteter: Aktivitet[];
}
export function useFetchAktivitetMedFnrContext() {
    const fnr = useFnrContext();
    return useFetchAktivitet(fnr);
}

export function useFetchAktivitet(fnr?: string) {
    const query = fnrQuery(fnr);
    const aktiviteterFetch = useFetch<AktivitetResponse>('/veilarbaktivitet/api/aktivitet' + query);
    const arenaAktiviteterFetch = useFetch<ArenaAktivitet[]>('/veilarbaktivitet/api/aktivitet/arena' + query);

    const aktivitetData = hasData(aktiviteterFetch) ? aktiviteterFetch.data : undefined;
    const arenaListe = hasData(arenaAktiviteterFetch) ? arenaAktiviteterFetch.data : undefined;
    const aktivitetListe = aktivitetData && aktivitetData.aktiviteter;

    function findAktivitet(aktivitetId?: StringOrNull): mabyAktivitet {
        if (!aktivitetId) {
            return undefined;
        }

        if (aktivitetId.startsWith('ARENA')) {
            return arenaListe && arenaListe.find(a => a.id === aktivitetId);
        }
        return aktivitetListe && aktivitetListe.find(a => a.id === aktivitetId);
    }

    function isAktivitetLoading(includeRealoade = true) {
        return isPending(arenaAktiviteterFetch, includeRealoade) || isPending(aktiviteterFetch, includeRealoade);
    }

    function hasAktivitetError() {
        return hasError(arenaAktiviteterFetch) || hasError(aktiviteterFetch);
    }

    return { findAktivitet, isAktivitetLoading, hasAktivitetError };
}
