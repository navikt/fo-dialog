import { FieldError, useFormContext } from 'react-hook-form';
import React, { MutableRefObject, useEffect } from 'react';
import { HandlingsType, useViewContext } from '../../ViewState';
import { MeldingFormValues } from './MeldingInputBox';
import useMeldingStartTekst from '../UseMeldingStartTekst';
import { useFnrContext } from '../../Provider';

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

export const useFocusBeforeHilsen = (ref: MutableRefObject<HTMLTextAreaElement | null>) => {
    const fnr = useFnrContext();
    const { viewState } = useViewContext();
    const startTekst = useMeldingStartTekst();
    const {
        formState: { defaultValues, isDirty }
    } = useFormContext<MeldingFormValues>();

    useEffect(() => {
        if (!fnr) return;
        if (isDirty) return; // Wait until form is actually reset
        const bigScreen = window?.matchMedia(`(min-width: 900px)`)?.matches || false;
        const shouldAutoFocus = bigScreen && viewState.sistHandlingsType !== HandlingsType.nyDialog;
        if (shouldAutoFocus) {
            if (!ref.current) return;
            const initialText = ref.current?.value;
            if (!initialText || !initialText.endsWith(startTekst)) return;
            const start = initialText.length - startTekst.length;
            ref.current.selectionStart = start;
            ref.current.selectionEnd = start;
            ref.current?.focus();
        }
    }, [defaultValues?.melding, isDirty]);
};
