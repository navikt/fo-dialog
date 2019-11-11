import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';

interface ErVeileder {
    erVeileder: boolean;
}

export default function AldriUnderOppfolging(props: ErVeileder) {
    const text = props.erVeileder
        ? 'Denne brukeren er ikke registrert.'
        : 'Du må være registrert hos NAV for å bruke dialogen.';
    return <AlertStripeAdvarsel>{text}</AlertStripeAdvarsel>;
}
