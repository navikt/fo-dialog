import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { FieldState } from '../utils/useFieldState';

interface NyDialogFeedback {
    nyDialogFeedback: {
        tema: FieldState;
        melding: FieldState;
    };
}

function DialogNewFeedbackSummary(props: NyDialogFeedback) {
    let temain = props.nyDialogFeedback.tema.input;
    let meldingin = props.nyDialogFeedback.melding.input;
    if (temain.feil !== undefined || meldingin.feil !== undefined) {
        //TODO: ikke vis feedbacksummary visse ganger (f.eks. ikke før SEND
        return (
            <div className="dialog-new__feedbacksummary">
                <Undertittel>Fyll ut obligatoriske felt</Undertittel>
                <ul>
                    {temain.feil !== undefined ? (
                        <li>
                            <a href={'#temaIn'}>
                                <Normaltekst className="dialog-new__errortekst">{temain.feil.feilmelding}</Normaltekst>
                            </a>
                        </li>
                    ) : (
                        ''
                    )}
                    {meldingin.feil !== undefined ? (
                        <li>
                            <a href={'#meldingIn'}>
                                <Normaltekst className="dialog-new__errortekst">
                                    {meldingin.feil.feilmelding}
                                </Normaltekst>
                            </a>
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
            </div>
        );
    }
    return null;
}

export default DialogNewFeedbackSummary;
