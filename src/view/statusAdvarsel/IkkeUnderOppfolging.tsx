import React from 'react';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';
import useApiBasePath from '../../utils/UseApiBasePath';
import Lenke from 'nav-frontend-lenker';

interface Props {
    erVeileder: boolean;
}

export default function IkkeUnderOppfolging(props: Props) {
    return props.erVeileder ? null : <HarPerioderBruker />;
}

function HarPerioderBruker() {
    const basePath = useApiBasePath();
    return (
        <StatusAdvarselWrapper>
            Du er ikke lenger registrert hos NAV. Hvis du fortsatt skal få oppfølging fra NAV og ha dialog med veileder
            må du være registrert.
            <br />
            <Lenke href={`${basePath}/arbeidssokerregistrering`}>Registrer deg hos NAV</Lenke>
        </StatusAdvarselWrapper>
    );
}
