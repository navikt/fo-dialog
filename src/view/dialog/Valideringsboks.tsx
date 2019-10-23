import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { FieldState } from '../../utils/UseFieldState';

import Feilmeldingslenke from './Feilmeldingslenke';

interface Props {
    tema: FieldState;
    melding: FieldState;
    triedToSubmit: boolean;
}

function Valideringsboks(props: Props) {
    if (props.triedToSubmit && (props.tema.input.feil !== undefined || props.melding.input.feil !== undefined)) {
        return (
            <div className="feedbacksummary">
                <Undertittel>Fyll ut obligatoriske felt</Undertittel>
                <Feilmeldingslenke anchor="#temaIn" feil={props.tema.input.feil} />
                <Feilmeldingslenke anchor="#meldingIn" feil={props.melding.input.feil} />
            </div>
        );
    }
    return null;
}

export default Valideringsboks;
