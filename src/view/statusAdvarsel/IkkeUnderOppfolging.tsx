import { Link } from '@navikt/ds-react';
import React from 'react';

import { arbeidssokerregistreringUrl } from '../../metrics/constants';
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
            <Link href={`${arbeidssokerregistreringUrl}`}>Registrer deg hos NAV</Link>
        </StatusAdvarselWrapper>
    );
}
