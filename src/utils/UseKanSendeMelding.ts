import { useOppfolgingContext } from '../view/OppfolgingProvider';
import { dataOrUndefined } from '../view/Provider';

export default function useKansendeMelding(): boolean {
    const oppfolgingContext = useOppfolgingContext();
    //TODO min id pasport
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
        !oppfolgingData.manuell
    );
}
