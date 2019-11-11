import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    erVeileder: boolean;
}

export default function ReservertKrr(props: Props) {
    return props.erVeileder ? <VeilederKrr /> : <BrukerKrr />;
}

function BrukerKrr() {
    return (
        <AlertStripeAdvarsel>
            For å ta i bruk den digitale aktivitetsplanen, må du fjerne reservasjonen din mot digital kommunikasjon.
            <a href="https://www.norge.no/nn/reservasjon">Gå til Norge.no for å fjerne reservasjonen</a>
            <Hovedknapp onClick={window.location.reload}>Jeg har fjerent reservasjonen</Hovedknapp>
        </AlertStripeAdvarsel>
    );
}

function VeilederKrr() {
    return <AlertStripeAdvarsel>Brukeren er reservert i KRR</AlertStripeAdvarsel>;
}
