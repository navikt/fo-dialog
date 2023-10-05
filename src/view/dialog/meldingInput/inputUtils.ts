import { FieldError } from 'react-hook-form';
import React from 'react';

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

export const debounced = <T extends (...args: any[]) => void>(fn: T): { cleanup: () => void; invoke: T } => {
    let timer: any | undefined;
    const invoke: T = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, 500);
    };
    const cleanup = () => {
        clearTimeout(timer);
    };
    return { cleanup, invoke };
};

export interface MeldingInputArgs {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    noeFeilet: boolean;
    isSyncingKladd: boolean;
}
export const MeldingInputContext = React.createContext<MeldingInputArgs>({
    onSubmit: (e) => Promise.resolve(),
    noeFeilet: false,
    isSyncingKladd: false
});
