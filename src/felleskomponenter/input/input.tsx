import { FieldState } from '@nutgaard/use-formstate';
import { InputProps, Input as NavInput } from 'nav-frontend-skjema';
/* eslint-disable no-unused-vars */
import React, { ChangeEvent } from 'react';

interface Props {
    touched: boolean;
    error?: string;
    input: FieldState['input'];
    pristine?: boolean;
    initialValue?: string;
    submittoken?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// pristine and initialValue isn't used, but we don't want to pass it to input
function Input(props: Props & InputProps) {
    const { touched, error, input, onChange, pristine, initialValue, submittoken, ...rest } = props;
    const feil = error && !!submittoken ? { feilmelding: error } : undefined;
    const inputProps = { ...input, ...rest };

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        !!onChange && onChange(e);
        input.onChange(e);
    };

    return <NavInput {...inputProps} feil={feil} onChange={_onChange} />;
}

export default Input;
