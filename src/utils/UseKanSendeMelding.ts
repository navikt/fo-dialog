import { dataOrUndefined, useOppfolgingContext } from '../view/Provider';

export default function useKansendeMelding(): boolean {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    return (
        !!oppfolgingData &&
        oppfolgingData.underOppfolging &&
        !oppfolgingData.reservasjonKRR &&
        oppfolgingData.kanVarsles &&
        !oppfolgingData.manuell
    );
}
