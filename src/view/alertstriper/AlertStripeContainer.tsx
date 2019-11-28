import React from 'react';
import { dataOrUndefined, useOppfolgingContext, useUserInfoContext } from '../Provider';
import IkkeUnderOppfolging from './IkkeUnderOppfolging';
import ReservertKrr from './ReservertKrr';
import KanIkkeVarsles from './KanIkkeVarsles';
import AldriUnderOppfolging from './AldriUnderOppfolging';
import MannuelBruker from './Manuell';

export default function AlertStripeContainer() {
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

    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return <AldriUnderOppfolging erVeileder={erVeileder} />;
    }
    if (!erUnderOppfolging) {
        return <IkkeUnderOppfolging erVeileder={erVeileder} />;
    }
    if (erReservertKrr) {
        return <ReservertKrr erVeileder={erVeileder} />;
    }
    if (!kanVarsles) {
        return <KanIkkeVarsles erVeileder={erVeileder} />;
    }
    if (manuellBruker) {
        return <MannuelBruker erVeileder={erVeileder} />;
    }

    return null;
}
