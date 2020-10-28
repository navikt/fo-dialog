import { dataOrUndefined, useHarNivaa4Context, useOppfolgingContext } from '../view/Provider';
import { erProd } from './FellesFunksjoner';

export default function useKansendeMelding(): boolean {
    const oppfolgingContext = useOppfolgingContext();
    const harNivaa4 = useHarNivaa4Context();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    console.log('nivaa 4', harNivaa4);

    if (!oppfolgingData) {
        return false;
    }

    // erProd trengs da ingen av brukerne er registrert i krr i testmiljø
    const kanVarsles = oppfolgingData.kanVarsles || !erProd();

    return (
        oppfolgingData.harSkriveTilgang &&
        oppfolgingData.underOppfolging &&
        !oppfolgingData.reservasjonKRR &&
        kanVarsles &&
        !oppfolgingData.manuell &&
        harNivaa4.harNivaa4
    );
}
