import Lenke from 'nav-frontend-lenker';
import React from 'react';

import { getPathnamePrefix } from '../../utils/UseApiBasePath';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

export default function AldriUnderOppfolging(props: Props) {
    return props.erVeileder ? <Veileder /> : <Bruker />;
}

function Veileder() {
    return <StatusAdvarselWrapper>Denne brukeren har ikke tidligere dialoger i Modia.</StatusAdvarselWrapper>;
}

function Bruker() {
    const basePath = getPathnamePrefix();

    return (
        <StatusAdvarselWrapper>
            Du må være registrert hos NAV for å ha digital dialog med veileder. <br />
            <Lenke href={`${basePath}/arbeidssokerregistrering`}>Registrer deg hos NAV</Lenke>
        </StatusAdvarselWrapper>
    );
}
