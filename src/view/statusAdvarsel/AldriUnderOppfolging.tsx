import Lenke from 'nav-frontend-lenker';
import React from 'react';

import { arbeidssokerregistreringUrl } from '../../metrics/constants';
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
    return (
        <StatusAdvarselWrapper>
            Du må være registrert hos NAV for å ha digital dialog med veileder. <br />
            <Lenke href={`${arbeidssokerregistreringUrl}`}>Registrer deg hos NAV</Lenke>
        </StatusAdvarselWrapper>
    );
}
