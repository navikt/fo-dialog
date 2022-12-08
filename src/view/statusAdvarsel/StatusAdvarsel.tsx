import React from 'react';

import { erProd } from '../../utils/FellesFunksjoner';
import { useUserInfoContext } from '../BrukerProvider';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined, useHarNivaa4Context } from '../Provider';
import AldriUnderOppfolging from './AldriUnderOppfolging';
import IkkeUnderOppfolging from './IkkeUnderOppfolging';
import KanIkkeVarsles from './KanIkkeVarsles';
import ManuellBruker from './ManuellBruker';
import { ManglerNivaa4, Nivaa4Feiler } from './Nivaa4';
import ReservertKrr from './ReservertKrr';

export default function StatusAdvarsel() {
    const oppfolgingDataContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingDataContext);
    const UserInfo = useUserInfoContext();
    const HarNiva4 = useHarNivaa4Context();

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
        return <ManuellBruker erVeileder={erVeileder} />;
    }
    if (!kanVarsles && erProd()) {
        //erProd trengs da ingen av brukerne er registrert i krr i testmiljø
        return <KanIkkeVarsles erVeileder={erVeileder} />;
    }

    if (HarNiva4.hasError) {
        return <Nivaa4Feiler erVeileder={erVeileder} />;
    }
    if (!HarNiva4.harNivaa4) {
        return <ManglerNivaa4 erVeileder={erVeileder} />;
    }

    return null;
}
