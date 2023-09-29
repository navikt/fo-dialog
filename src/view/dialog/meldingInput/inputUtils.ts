import { FieldError } from 'react-hook-form';
import React, { ChangeEvent } from 'react';

export const maxMeldingsLengde = 5000;
export const betterErrorMessage = (error: FieldError, melding: string): FieldError => {
    const tooBig = error.type === 'too_big';
    return {
        ...error,
        message: tooBig
            ? `Meldingen kan ikke være mer enn ${maxMeldingsLengde} tegn, men er ${melding.length}`
            : error.message
    };
};

export interface MeldingInputArgs {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    noeFeilet: boolean;
}
export const MeldingInputContext = React.createContext<MeldingInputArgs>({
    onSubmit: (e) => Promise.resolve(),
    onChange: () => {},
    noeFeilet: false
});
