import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';

interface Props {
    erVeileder: boolean;
}

export default function AldriUnderOppfolging(props: Props) {
    const text = props.erVeileder
        ? 'Denne brukeren er ikke registrert.'
        : 'Du må være registrert hos NAV for å bruke dialogen.';
    return <AlertStripeAdvarsel>{text}</AlertStripeAdvarsel>;
}
