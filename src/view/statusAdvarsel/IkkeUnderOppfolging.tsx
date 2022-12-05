import Lenke from 'nav-frontend-lenker';
import React from 'react';

import { getPathnamePrefix } from '../../utils/UseApiBasePath';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

export default function IkkeUnderOppfolging(props: Props) {
    return props.erVeileder ? null : <HarPerioderBruker />;
}

function HarPerioderBruker() {
    const basePath = getPathnamePrefix();
    return (
        <StatusAdvarselWrapper>
            Du er ikke lenger registrert hos NAV. Hvis du fortsatt skal få oppfølging fra NAV og ha dialog med veileder
            må du være registrert.
            <br />
            <Lenke href={`${basePath}/arbeidssokerregistrering`}>Registrer deg hos NAV</Lenke>
        </StatusAdvarselWrapper>
    );
}
