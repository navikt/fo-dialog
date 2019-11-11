import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface Props {
    erVeileder: boolean;
}

export default function KanIkkeVarsles(props: Props) {
    const veilederText = 'Bruker kan ikke få varsling om dialoger';
    const brukerText =
        'Du kan ikke varsles om meldinger dette er en feil venligst ring teknisk bukerstøtte tlf: 55 55 33 39, tastevalg 3.';

    return <AlertStripeAdvarsel>{props.erVeileder ? veilederText : brukerText}</AlertStripeAdvarsel>;
}
