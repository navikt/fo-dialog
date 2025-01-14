import { Link, Heading } from '@navikt/ds-react';
import React from 'react';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';

interface Props {
    erIkkRegristrertIKrr: boolean;
}

export default function ErIkkeIKrr(props: Props) {
    return props.erIkkRegristrertIKrr ? <BrukerIkkeIIKrr /> : null;
}

function BrukerIkkeIIKrr() {
    return (
        <StatusAdvarselWrapper>
            <Heading spacing size="small" level="3">
                Vi har ikke din kontaktinformasjon
            </Heading>
            Du kan ikke sende meldinger i dialogen fordi du ikke har registrert e-post eller telefonnummeret ditt i
            kontakt og reservasjonsregisteret (KRR).
            <Link href="https://www.norge.no/nb/digital-borger/registrer">
                Gå til norge.no for å registrere.
            </Link>
        </StatusAdvarselWrapper>
    );
}