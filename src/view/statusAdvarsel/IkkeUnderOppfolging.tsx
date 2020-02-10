import React from 'react';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

export default function IkkeUnderOppfolging(props: Props) {
    return props.erVeileder ? null : <HarPerioderBruker />;
}

function HarPerioderBruker() {
    return (
        <StatusAdvarselWrapper>
            Du er ikke lenger registrert hos NAV. Hvis du fortsatt skal få oppfølging fra NAV og ha dialog med veileder
            må du være registrert.
            <br />
            <a href="">Registrer deg hos NAV</a>
        </StatusAdvarselWrapper>
    );
}
