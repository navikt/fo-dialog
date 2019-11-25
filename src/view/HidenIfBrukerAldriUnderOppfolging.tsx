import React from 'react';
import { dataOrUndefined, useOppfolgingContext, useUserInfoContext } from './Provider';

export default function HidenIfBrukerAldriUnderOppfolging(props: { children: React.ReactNode }) {
    const oppfolgingContext = useOppfolgingContext();
    const brukerdata = useUserInfoContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    const erBruker = brukerdata && brukerdata.erBruker;
    const underOppfulging = oppfolgingData && oppfolgingData.underOppfolging;
    const manuell = oppfolgingData && oppfolgingData.manuell;
    const harTidligerePerioder = oppfolgingData && oppfolgingData.oppfolgingsPerioder.length > 0;

    const aldriOppfolging = !underOppfulging && !harTidligerePerioder;
    const manuellBruker = erBruker && manuell;

    if (aldriOppfolging || manuellBruker) {
        return null;
    }

    return <div className="app__body"> {props.children} </div>;
}
