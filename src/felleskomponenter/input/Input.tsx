import { TextField } from '@navikt/ds-react';
import { FieldState } from '@nutgaard/use-formstate';
import React, { ChangeEvent } from 'react';

interface Props {
    touched: boolean;
    error?: string;
    setValue: (value: string) => void;
    input: FieldState['input'];
    pristine?: boolean;
    initialValue?: string;
    submittoken?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

// pristine, initialValue and setValue isn't used, but we don't want to pass it to input
function Input(props: Props) {
    const { touched, error, input, onChange, pristine, initialValue, setValue, submittoken, ...rest } = props;
    const feil = error && !!submittoken ? error : undefined;

    const inputProps = { ...input, ...rest };

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        !!onChange && onChange(e);
        input.onChange(e);
    };

    return <TextField {...inputProps} error={feil} onChange={_onChange} />;
}

export default Input;
