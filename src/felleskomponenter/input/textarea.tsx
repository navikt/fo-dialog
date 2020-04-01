import React, { ChangeEvent } from 'react';
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
    submittoken?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

// pristine and initialValue isn't used, but we don't want to pass it to input
function Textarea(props: Props) {
    const { touched, error, input, pristine, initialValue, visTellerFra, onChange, submittoken, ...rest } = props;

    const feil = error && !!submittoken ? { feilmelding: error } : undefined;
    const inputProps = { ...input, ...rest };

    const _onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        !!onChange && onChange(e);
        input.onChange(e);
    };

    return (
        <NavTextArea
            tellerTekst={(antallTegn, max) => getTellerTekst(antallTegn, max, visTellerFra)}
            feil={feil}
            {...inputProps}
            onChange={_onChange}
        />
    );
}

export default Textarea;
