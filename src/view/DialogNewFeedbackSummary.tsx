import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { FieldState } from '../utils/useFieldState';

import './dialognew.less';
import Feilmeldingslenke from './Feilmeldingslenke';

interface Props {
    tema: FieldState;
    melding: FieldState;
    submitHit: boolean;
}

function DialogNewFeedbackSummary(props: Props) {
    console.log('submitHit: ', props.submitHit);
    if (props.submitHit && (props.tema.input.feil !== undefined || props.melding.input.feil !== undefined)) {
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

export default DialogNewFeedbackSummary;
