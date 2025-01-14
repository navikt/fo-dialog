import React from 'react';

import { useUserInfoContext } from '../BrukerProvider';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined } from '../Provider';
import AldriUnderOppfolging from './AldriUnderOppfolging';
import IkkeUnderOppfolging from './IkkeUnderOppfolging';
import KanIkkeVarsles from './KanIkkeVarsles';
import ManuellBruker from './ManuellBruker';
import ReservertKrr from './ReservertKrr';
import ErIkkeIKrr from './ErIkkeIKrr';

export default function StatusAdvarsel() {
    const oppfolgingDataContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingDataContext);
    const UserInfo = useUserInfoContext();

    if (!oppfolgingData || !UserInfo) {
        return null;
    }

    const erVeileder = UserInfo.erVeileder;
    const erUnderOppfolging = oppfolgingData.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData.oppfolgingsPerioder.length > 0;
    const erReservertKrr = oppfolgingData.reservasjonKRR;
    const kanVarsles = oppfolgingData.kanVarsles;
    const manuellBruker = oppfolgingData.manuell;
    const kanReaktiveres = oppfolgingData.kanReaktiveres;
    const erKrrBruker = oppfolgingData.erRegistrertKRR;

    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return <AldriUnderOppfolging erVeileder={erVeileder} />;
    }
    if (!erUnderOppfolging || kanReaktiveres) {
        return <IkkeUnderOppfolging erVeileder={erVeileder} />;
    }
    if (erReservertKrr) {
        return <ReservertKrr erVeileder={erVeileder} />;
    }
    if (manuellBruker) {
        return <ManuellBruker erVeileder={erVeileder} />;
    }
    if (!kanVarsles) {
        return <KanIkkeVarsles erVeileder={erVeileder} />;
    }
    if (erKrrBruker) {
        return <ErIkkeIKrr erIkkRegristrertIKrr={erKrrBruker} />;
    }

    return null;
}
