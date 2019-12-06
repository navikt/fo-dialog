import useFetch, { hasData } from '@nutgaard/use-fetch';
import { Aktivitet, ArenaAktivitet } from '../utils/AktivitetTypes';
import { StringOrNull } from '../utils/Typer';

type mabyAktivitet = Aktivitet | ArenaAktivitet | undefined;
interface AktivitetResponse {
    aktiviteter: Aktivitet[];
}

export function useFindAktivitet() {
    const aktiviteterFetch = useFetch<AktivitetResponse>('/veilarbaktivitet/api/aktivitet');
    const arenaAktiviteterFetch = useFetch<ArenaAktivitet[]>('/veilarbaktivitet/api/aktivitet/arena');

    const aktivitetData = hasData(aktiviteterFetch) ? aktiviteterFetch.data : undefined;
    const arenaListe = hasData(arenaAktiviteterFetch) ? arenaAktiviteterFetch.data : undefined;
    const aktivitetListe = aktivitetData && aktivitetData.aktiviteter;

    function findAktiivtet(aktivitetId?: StringOrNull): mabyAktivitet {
        if (!aktivitetId) {
            return undefined;
        }

        if (aktivitetId.startsWith('ARENA')) {
            return arenaListe && arenaListe.find(a => a.id === aktivitetId);
        }
        return aktivitetListe && aktivitetListe.find(a => a.id === aktivitetId);
    }

    return findAktiivtet;
}
