import React from 'react';
import { dataOrUndefined, useOppfolgingContext, useUserInfoContext } from './Provider';
import DialogContainer from './dialog/DialogContainer';
import AktivitetContainer from './aktivitet/AktivitetContainer';
import DialogOversiktContainer from './dialogliste/DialogOversiktContainer';

export default function AppBody() {
    const oppfolgingContext = useOppfolgingContext();
    const brukerdata = useUserInfoContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    if (!oppfolgingData || !brukerdata) {
        return null;
    }

    const { underOppfolging, manuell, reservasjonKRR, oppfolgingsPerioder } = oppfolgingData;
    const erBruker = brukerdata.erBruker;

    const aldriOppfolging = !underOppfolging && oppfolgingsPerioder.length === 0;
    const manuellBruker = erBruker && manuell;
    const krrBruker = erBruker && reservasjonKRR;

    if (aldriOppfolging || manuellBruker || krrBruker) {
        return null;
    }

    return (
        <div className="app__body">
            <DialogOversiktContainer />
            <DialogContainer />
            <AktivitetContainer />
        </div>
    );
}
