import React from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import Lenke from 'nav-frontend-lenker';

interface Props {
    anchor: string;
    feil?: SkjemaelementFeil;
}

function Feilmeldingslenke(props: Props) {
    if (props.feil !== undefined) {
        return (
            <li>
                <Lenke href={props.anchor} className="feedbacksummary__lenke">
                    {props.feil.feilmelding}
                </Lenke>
            </li>
        );
    }
    return null;
}

export default Feilmeldingslenke;
