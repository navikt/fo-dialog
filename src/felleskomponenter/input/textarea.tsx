import React from 'react';
import { Textarea as NavTextArea } from 'nav-frontend-skjema';
import { FieldState } from '@nutgaard/use-formstate';

function getTellerTekst(antallTegn: number, maxLength: number, visTellerFra?: number) {
    const tegnIgjen = maxLength - antallTegn;
    const tegnForMange = antallTegn - maxLength;
    const tellerFra = visTellerFra || maxLength;

    if (tegnForMange > 0) {
        return `Du har ${tegnForMange} tegn for mye`;
    }
    if (tegnIgjen <= tellerFra) {
        return `Du har ${tegnIgjen} tegn igjen`;
    }
    return null;
}

interface Props {
    initialValue?: string;
    pristine?: boolean;
    autoFocus?: boolean;
    touched: boolean;
    error?: string;
    input: FieldState['input'];
    visTellerFra?: number;
    placeholder?: string;
    textareaClass?: string;
    maxLength: number;
    label: any;
    showErrorOnSubmit?: boolean;
    submittoken?: string;
}

// pristine and initialValue isn't used, but we don't want to pass it to input
function Textarea(props: Props) {
    const {
        touched,
        error,
        input,
        pristine,
        initialValue,
        visTellerFra,
        submittoken,
        showErrorOnSubmit,
        ...rest
    } = props;
    const showError = showErrorOnSubmit ? !!submittoken : touched;

    const feil = error && showError ? { feilmelding: error } : undefined;
    const inputProps = { ...input, ...rest };

    return (
        <NavTextArea
            tellerTekst={(antallTegn, max) => getTellerTekst(antallTegn, max, visTellerFra)}
            feil={feil}
            {...inputProps}
        />
    );
}

export default Textarea;
