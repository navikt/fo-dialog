import { FieldError } from 'react-hook-form';

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
