import { FieldError, useFormContext } from 'react-hook-form';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { HandlingsType, useViewContext } from '../../ViewState';
import { MeldingFormValues } from './MeldingInputBox';
import useMeldingStartTekst from '../UseMeldingStartTekst';
import { useFnrContext } from '../../Provider';
import { KladdData } from '../../../utils/Typer';

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

type KladdOppdateringData = KladdData & { fnr: string | undefined };

export const debounced = <T extends Function>(
    fn: (data: KladdOppdateringData) => void
): { hasPendingTask: () => boolean; cleanup: () => void; invoke: T } => {
    let timer: number | undefined;
    const invoke = (data: KladdOppdateringData) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(data);
            timer = undefined;
        }, 500);
    };
    const cleanup = () => {
        clearTimeout(timer);
    };
    const hasPendingTask = () => {
        return timer !== undefined;
    };
    return { cleanup, invoke: invoke as unknown as T, hasPendingTask };
};

export interface MeldingInputArgs {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    noeFeilet: boolean;
    kladdErLagret: boolean;
}
export const MeldingInputContext = React.createContext<MeldingInputArgs>({
    onSubmit: (e) => Promise.resolve(),
    noeFeilet: false,
    kladdErLagret: false
});

export const useFocusBeforeHilsen = (textAreaRef: MutableRefObject<HTMLTextAreaElement | null>) => {
    // Avoid setting focus twice, making the textarea "flash"
    const hasFocus = useRef(false);
    useEffect(() => {
        if (textAreaRef.current === null) return;
        const setHasFocusTrue = (ev: FocusEvent) => (hasFocus.current = true);
        const setHasFocusFalse = (ev: FocusEvent) => (hasFocus.current = false);
        textAreaRef.current?.addEventListener('blur', setHasFocusFalse);
        textAreaRef.current?.addEventListener('focus', setHasFocusTrue);
    }, [textAreaRef.current]);

    const fnr = useFnrContext();
    const viewState = useViewContext();
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
            if (!textAreaRef.current) return;
            const initialText = textAreaRef.current?.value;
            if (!initialText || !initialText.endsWith(startTekst)) return;
            const start = initialText.length - startTekst.length;
            textAreaRef.current.selectionStart = start;
            textAreaRef.current.selectionEnd = start;
            if (hasFocus?.current) return;
            textAreaRef.current?.focus();
            hasFocus.current = true;
        }
    }, [defaultValues?.melding, isDirty, hasFocus]);
};
