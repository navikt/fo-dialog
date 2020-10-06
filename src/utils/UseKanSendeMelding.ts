import { dataOrUndefined, useOppfolgingContext } from '../view/Provider';
import { erProd } from './FellesFunksjoner';

export default function useKansendeMelding(): boolean {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

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
        !oppfolgingData.manuell
    );
}
