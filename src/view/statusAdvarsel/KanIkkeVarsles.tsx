import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface Props {
    erVeileder: boolean;
}

export default function KanIkkeVarsles(props: Props) {
    const veilederText = 'Bruker kan ikke få varsling om dialoger. For å endre dette må brukeren logge inn på Ditt NAV';
    const brukerText =
        'Du kan ikke varsles om meldinger. Dette er en feil.\nVennligst ring teknisk brukerstøtte\ntlf: 55 55 33 39, tastevalg 3.';

    return <AlertStripeAdvarsel>{props.erVeileder ? veilederText : brukerText}</AlertStripeAdvarsel>;
}
