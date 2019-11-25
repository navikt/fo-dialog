import React from 'react';
import { dataOrUndefined, useOppfolgingContext, useUserInfoContext } from './Provider';
import DialogListe from './dialogliste/DialogListe';
import Routes from './Routes';
import AktivitetContainer from './aktivitet/AktivitetContainer';

export default function DialogOversikt() {
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
            <DialogListe />
            <Routes />
            <AktivitetContainer />
        </div>
    );
}
