import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface ErVeileder {
    erVeileder: boolean;
}

export default function IkkeUnderOppfolging(props: ErVeileder) {
    return props.erVeileder ? <HarPerioderVeileder /> : <HarPerioderBruker />;
}

function HarPerioderBruker() {
    return (
        <AlertStripeAdvarsel>
            Du er ikke lenger registrert hos NAV og din tidligere aktivitetsplan er lagt under "Mine tidligere planer".
            Hvis du fortsatt skal motta ytelser, få oppfølging fra NAV og bruke aktivitetsplanen må du være registrert.
            <a href="https://www.nav.no/Forsiden">www.nav.no</a>
        </AlertStripeAdvarsel>
    );
}

function HarPerioderVeileder() {
    return <AlertStripeAdvarsel>Denne brukeren er ikke under oppføllging.</AlertStripeAdvarsel>;
}
