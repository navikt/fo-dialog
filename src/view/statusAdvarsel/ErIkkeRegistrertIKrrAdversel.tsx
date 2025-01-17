import { Link, Heading } from '@navikt/ds-react';
import React from 'react';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';

export default function ErIkkeRegistrertIKrrAdverselBruker() {
    return  <BrukerIkkeIIKrr />;
}

const LinkIkkeRegistrertIKrr = 'https://www.norge.no/nb/digital-borger/oppdater-kontaktinformasjon';

function BrukerIkkeIIKrr() {
    return (
        <StatusAdvarselWrapper>
            <Heading spacing size="small" level="3">
                Vi har ikke din kontaktinformasjon
            </Heading>
            Du kan ikke sende meldinger i dialogen fordi du ikke har registrert e-post eller telefonnummeret ditt i
            kontakt og reservasjonsregisteret (KRR).
            <Link href={LinkIkkeRegistrertIKrr}>Gå til norge.no for å registrere.</Link>
        </StatusAdvarselWrapper>
    );
}