import { useOppfolgingContext } from '../view/OppfolgingProvider';
import { dataOrUndefined, useHarNivaa4Context } from '../view/Provider';

export default function useKansendeMelding(): boolean {
    const oppfolgingContext = useOppfolgingContext();
    //TODO min id pasport
    const harNivaa4 = useHarNivaa4Context();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    if (!oppfolgingData) {
        return false;
    }

    const kanVarsles = oppfolgingData.kanVarsles;

    return (
        oppfolgingData.harSkriveTilgang &&
        oppfolgingData.underOppfolging &&
        !oppfolgingData.reservasjonKRR &&
        kanVarsles &&
        !oppfolgingData.manuell &&
        harNivaa4.harNivaa4
    );
}
