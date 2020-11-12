import { dataOrUndefined, useOppfolgingContext } from '../view/Provider';
import { erProd } from './FellesFunksjoner';

export default function useKansendeMelding(): boolean {
    const oppfolgingContext = useOppfolgingContext();
    //TODO min id pasport
    //const harNivaa4 = useHarNivaa4Context();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    if (!oppfolgingData) {
        return false;
    }

    //TODO sjekk denne mot doly brukere

    // erProd trengs da ingen av brukerne er registrert i krr i testmiljø
    const kanVarsles = oppfolgingData.kanVarsles || !erProd();

    return (
        oppfolgingData.harSkriveTilgang &&
        oppfolgingData.underOppfolging &&
        !oppfolgingData.reservasjonKRR &&
        kanVarsles &&
        !oppfolgingData.manuell
        //TODO min id pasport  er ferdig
        //&&
        //harNivaa4.harNivaa4
    );
}
