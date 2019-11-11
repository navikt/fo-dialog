import React from 'react';
import { useOppfolgingContext } from './Provider';

export default function HidenIfBrukerAldriUnderOppfolging(props: { children: React.ReactNode }) {
    const oppfolgingData = useOppfolgingContext();

    const underOppfulging = oppfolgingData && oppfolgingData.underOppfolging;
    const harTidligerePerioder = oppfolgingData && oppfolgingData.oppfolgingsPerioder.length > 0;

    if (underOppfulging || harTidligerePerioder) {
        return <div className="app__body"> {props.children} </div>;
    }

    return null;
}
