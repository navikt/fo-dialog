import { Link, Heading } from '@navikt/ds-react';
import React from 'react';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';

export default function ErIkkeRegistrertIKrrAdverselVeileder() {
    return <BrukerIkkeIIKrrVeileder />;
}

const linkIkkeRegistrertIKrr = 'https://www.norge.no/nb/digital-borger/oppdater-kontaktinformasjon';

function BrukerIkkeIIKrrVeileder() {
    return (
        <StatusAdvarselWrapper>
            <Heading spacing size="small" level="3">
                Brukeren er ikke registrert i KRR
            </Heading>
            Du kan ikke sende meldinger i dialogen fordi brukeren ikke har registrert e-post eller telefonnummeret sitt
            i KRR.
            <br />
            <Link href={linkIkkeRegistrertIKrr}>Brukeren må gå til norge.no for å registrere.</Link>
        </StatusAdvarselWrapper>
    );
}
