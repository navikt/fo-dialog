import { Link } from '@navikt/ds-react';
import React from 'react';

import { arbeidssokerregistreringUrl } from '../../constants';
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
            <Link href={`${arbeidssokerregistreringUrl}`}>Registrer deg hos NAV</Link>
        </StatusAdvarselWrapper>
    );
}
