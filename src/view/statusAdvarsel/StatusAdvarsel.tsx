import React from 'react';
import { dataOrUndefined, useOppfolgingContext, useUserInfoContext } from '../Provider';
import IkkeUnderOppfolging from './IkkeUnderOppfolging';
import ReservertKrr from './ReservertKrr';
import KanIkkeVarsles from './KanIkkeVarsles';
import AldriUnderOppfolging from './AldriUnderOppfolging';
import MannuelBruker from './Manuell';
import { erProd } from '../../utils/FellesFunksjoner';

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
        return <MannuelBruker erVeileder={erVeileder} />;
    }
    if (!kanVarsles && erProd()) {
        //erProd trengs da ingen av brukerne er registrert i krr i testmiljø
        return <KanIkkeVarsles erVeileder={erVeileder} />;
    }

    return null;
}
