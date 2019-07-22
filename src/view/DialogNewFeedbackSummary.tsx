import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { ReactNode } from 'react';
import { FieldState } from '../utils/useFieldState';

function feilmeldingslenke(feil: ReactNode, anchor: string) {
    return (
        <li>
            <a href={anchor}>
                <Normaltekst className="dialog-new__errortekst">{feil}</Normaltekst>
            </a>
        </li>
    );
}

interface NyDialogFeedback {
    nyDialogFeedback: {
        tema: FieldState;
        melding: FieldState;
    };
}

function DialogNewFeedbackSummary(props: NyDialogFeedback) {
    const temaInput = props.nyDialogFeedback.tema.input;
    const meldingInput = props.nyDialogFeedback.melding.input;

    if (temaInput.feil !== undefined || meldingInput.feil !== undefined) {
        //TODO: ikke vis feedbacksummary visse ganger (f.eks. ikke før SEND
        return (
            <div className="dialog-new__feedbacksummary">
                <Undertittel>Fyll ut obligatoriske felt</Undertittel>
                <ul>
                    {temaInput.feil !== undefined ? feilmeldingslenke(temaInput.feil.feilmelding, '#temaIn') : ''}
                    {meldingInput.feil !== undefined
                        ? feilmeldingslenke(meldingInput.feil.feilmelding, '#meldingIn')
                        : ''}
                </ul>
            </div>
        );
    }
    return null;
}

export default DialogNewFeedbackSummary;
