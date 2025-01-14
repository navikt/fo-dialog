import { Link, Heading } from '@navikt/ds-react';
import React from 'react';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';

export default function ErIkkeRegistrertIKrrAdverselVeileder() {
    return  <BrukerIkkeIIKrrVeileder />;
}

function BrukerIkkeIIKrrVeileder() {
    return (
        <StatusAdvarselWrapper>
            <Heading spacing size="small" level="3">
                Brukeren er ikke registrert i KRR
            </Heading>
            Du kan ikke sende meldinger i dialogen fordi brukeren ikke har registrert e-post eller telefonnummeret sitt i KRR.
            <Link
                href="https://www.norge.no/nb/digital-borger/registrer">Brukeren må gå til norge.no for å registrere.
            </Link>
        </StatusAdvarselWrapper>
    );
}