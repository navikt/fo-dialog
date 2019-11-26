import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useOppfolgingContext } from '../Provider';

interface Props {
    erVeileder: boolean;
}

export default function ReservertKrr(props: Props) {
    return props.erVeileder ? <VeilederKrr /> : <BrukerKrr />;
}

function BrukerKrr() {
    const opppfolging = useOppfolgingContext();

    return (
        <AlertStripeAdvarsel>
            For å ta i bruk den digitale dialogen med din veileder, må du fjerne reservasjonen din mot digital
            kommunikasjon.
            <a href="https://www.norge.no/nn/reservasjon">Gå til Norge.no for å fjerne reservasjonen</a>
            <Hovedknapp onClick={opppfolging.rerun}>Jeg har fjernet reservasjonen</Hovedknapp>
        </AlertStripeAdvarsel>
    );
}

function VeilederKrr() {
    return <AlertStripeAdvarsel>Brukeren er reservert i KRR</AlertStripeAdvarsel>;
}
