import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import loggEvent from '../../../felleskomponenter/logging';
import { DialogData } from '../../../utils/Typer';
import { dispatchUpdate, UpdateTypes } from '../../../utils/UpdateEvent';
import { useDialogContext } from '../../DialogProvider';
import { useCompactMode } from '../../../featureToggle/FeatureToggleProvider';
import { useKladdContext } from '../../KladdProvider';
import { useViewContext } from '../../Provider';
import { HandlingsType, sendtNyMelding } from '../../ViewState';
import useMeldingStartTekst from '../UseMeldingStartTekst';
import { Breakpoint, useBreakpoint } from '../../utils/useBreakpoint';
import { MeldingBottomInput } from './MeldingBottomInput';
import { MeldingSideInput } from './MeldingSideInput';
import { maxMeldingsLengde } from './inputUtils';
import { useVisAktivitet } from '../../AktivitetToggleContext';

const schema = z.object({
    melding: z
        .string()
        .min(1, 'Du må fylle ut en melding')
        .max(maxMeldingsLengde, `Meldingen kan ikke være mer enn ${maxMeldingsLengde}`)
});

export type MeldingFormValues = z.infer<typeof schema>;

interface Props {
    dialog: DialogData;
    kanSendeHenveldelse: boolean;
}

const MeldingInputBox = (props: Props) => {
    const { hentDialoger, nyMelding } = useDialogContext();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useMeldingStartTekst();
    const visAktivitet = useVisAktivitet();
    const compactMode = useCompactMode();

    const { kladder, oppdaterKladd, slettKladd } = useKladdContext();
    const kladd = kladder.find((k) => k.aktivitetId === props.dialog.aktivitetId && k.dialogId === props.dialog.id);

    const { viewState, setViewState } = useViewContext();

    const valgtDialog = props.dialog;
    const kanSendeHenveldelse = props.kanSendeHenveldelse;
    const timer = useRef<number | undefined>();
    const callback = useRef<() => any>();

    useLayoutEffect(() => {
        const match = window.matchMedia ? window.matchMedia(`(min-width: 900px)`).matches : false;
        const autoFocus = match && viewState.sistHandlingsType !== HandlingsType.nyDialog;

        if (autoFocus) {
            const el = document.getElementsByClassName('autosizing-textarea')[0] as HTMLInputElement;
            if (el) {
                el.focus();
                if (kladd?.tekst) {
                    el.selectionStart = el.selectionEnd = el.value.length;
                }
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            timer.current && clearInterval(timer.current);
            timer.current && callback.current && callback.current();
        };
    }, []);

    const defaultValues: MeldingFormValues = {
        melding: !!kladd?.tekst ? kladd.tekst : startTekst
    };

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        timer.current && clearInterval(timer.current);
        callback.current = () => {
            timer.current = undefined;
            oppdaterKladd(props.dialog.id, props.dialog.aktivitetId, null, value);
        };
        timer.current = window.setTimeout(callback.current, 500);
    };

    const formHandlers = useForm<MeldingFormValues>({
        defaultValues,
        resolver: zodResolver(schema)
    });
    const { handleSubmit, reset } = formHandlers;

    const onSubmit = (data: MeldingFormValues) => {
        setNoeFeilet(false);
        const { melding } = data;

        timer.current && clearInterval(timer.current);
        timer.current = undefined;

        loggEvent('arbeidsrettet-dialog.ny.henvendelse', { paaAktivitet: !!valgtDialog.aktivitetId });
        return nyMelding(melding, valgtDialog)
            .then((dialog) => {
                slettKladd(valgtDialog.id, valgtDialog.aktivitetId);
                return dialog;
            })
            .then(hentDialoger)
            .then(() => {
                setNoeFeilet(false);
                reset({ melding: startTekst });
                setViewState(sendtNyMelding(viewState));
                dispatchUpdate(UpdateTypes.Dialog);
            })
            .catch((e) => {
                console.log({ e });
                setNoeFeilet(true);
            });
    };

    const breakpoint = useBreakpoint();
    const args = { noeFeilet, onSubmit: handleSubmit((data) => onSubmit(data)), onChange };

    if (!kanSendeHenveldelse) return null;
    const Input = () => {
        if (!compactMode) {
            return <MeldingBottomInput {...args} />;
        } else if (visAktivitet && [Breakpoint.md, Breakpoint.lg, Breakpoint.xl].includes(breakpoint)) {
            return <MeldingBottomInput {...args} />;
        } else if ([Breakpoint.initial, Breakpoint.sm, Breakpoint.md].includes(breakpoint)) {
            return <MeldingBottomInput {...args} />;
        } else {
            return <MeldingSideInput {...args} />;
        }
    };

    return (
        <FormProvider {...formHandlers}>
            <Input />
        </FormProvider>
    );
};

export default MeldingInputBox;
