import React, { useCallback, useState } from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

export interface FieldState {
    input: {
        value: string;
        onChange: React.ChangeEventHandler;
        onBlur: React.FocusEventHandler;
        feil?: SkjemaelementFeil;
    };
    reset(): void;
    error: string | null;
    setValue(value: string): void;
    validate(): void;
}

export type Validator = (value: string) => string | null;
const noopValidator: Validator = () => null;

export default function useFieldState(initialState: string, validate: Validator = noopValidator): FieldState {
    const [value, setRawValue] = useState(initialState);
    const [touched, setTouched] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(validate(value));

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setRawValue(newValue);
            setError(validate(newValue));
        },
        [setRawValue, setError, validate]
    );

    const onBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true);
            setError(validate(event.target.value));
        },
        [validate, setTouched]
    );

    const handleValidate = () => {
        setTouched(true);
        setError(validate(value));
    };

    const setValue = (value: string) => {
        setRawValue(value);
        setError(validate(value));
    };

    const reInitialize = () => {
        setRawValue('');
        setError(null);
    };

    return {
        input: {
            value,
            onChange,
            onBlur,
            feil: !touched || error === null ? undefined : { feilmelding: error }
        },
        reset: reInitialize,
        validate: handleValidate,
        error,
        setValue
    };
}
