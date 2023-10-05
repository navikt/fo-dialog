import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import loggEvent from '../../../felleskomponenter/logging';
import { DialogData } from '../../../utils/Typer';
import { dispatchUpdate, UpdateTypes } from '../../../utils/UpdateEvent';
import { useDialogContext } from '../../DialogProvider';
import { useCompactMode } from '../../../featureToggle/FeatureToggleProvider';
import { useKladdContext } from '../../KladdProvider';
import { HandlingsType, sendtNyMelding, useViewContext } from '../../ViewState';
import useMeldingStartTekst from '../UseMeldingStartTekst';
import { Breakpoint, useBreakpoint } from '../../utils/useBreakpoint';
import { MeldingBottomInput } from './MeldingBottomInput';
import { MeldingSideInput } from './MeldingSideInput';
import { debounced, maxMeldingsLengde, MeldingInputContext } from './inputUtils';
import { useVisAktivitet } from '../../AktivitetToggleContext';
import { Status } from '../../../api/typer';

const schema = z.object({
    melding: z
        .string()
        .min(1, 'Du må fylle ut en melding')
        .max(maxMeldingsLengde, `Meldingen kan ikke være mer enn ${maxMeldingsLengde}`)
});

export type MeldingFormValues = z.infer<typeof schema>;

interface Props {
    dialog: DialogData; // Bruker prop og ikke context siden komponent ikke skal rendrer uten en valgt dialog
    kanSendeHenveldelse: boolean;
}

const MeldingInputBox = ({ dialog: valgtDialog, kanSendeHenveldelse }: Props) => {
    const { hentDialoger, nyMelding } = useDialogContext();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useMeldingStartTekst();
    const visAktivitet = useVisAktivitet();
    const compactMode = useCompactMode();
    const { kladder, oppdaterKladd, slettKladd, oppdaterStatus } = useKladdContext();
    const kladd = kladder.find((k) => k.aktivitetId === valgtDialog.aktivitetId && k.dialogId === valgtDialog.id);
    const { viewState, setViewState } = useViewContext();

    useLayoutEffect(() => {
        const bigScreen = window?.matchMedia(`(min-width: 900px)`)?.matches || false;
        const shouldAutoFocus = bigScreen && viewState.sistHandlingsType !== HandlingsType.nyDialog;

        if (shouldAutoFocus) {
            const el = document.getElementsByClassName('autosizing-textarea')[0] as HTMLInputElement;
            if (el) {
                el.focus();
                if (kladd?.tekst) {
                    el.selectionStart = el.selectionEnd = el.value.length;
                }
            }
        }
    }, []);

    const defaultValues: MeldingFormValues = {
        melding: kladd?.tekst || startTekst
    };

    const formHandlers = useForm<MeldingFormValues>({
        defaultValues,
        resolver: zodResolver(schema)
    });
    const { handleSubmit, reset, watch } = formHandlers;

    useEffect(() => {
        reset(defaultValues);
    }, [valgtDialog]);

    const melding = watch('melding');
    const { cleanup: stopKladdSyncing, invoke: debouncedOppdaterKladd } = useMemo(() => {
        return debounced(oppdaterKladd);
    }, [oppdaterKladd]);

    useEffect(() => {
        if (melding === defaultValues.melding) return;
        debouncedOppdaterKladd(valgtDialog.id, valgtDialog.aktivitetId, null, melding);
    }, [melding]);

    const onSubmit = useMemo(() => {
        return ({ melding }: MeldingFormValues) => {
            setNoeFeilet(false);
            stopKladdSyncing();
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
    }, [slettKladd, setNoeFeilet, setViewState, startTekst, stopKladdSyncing, valgtDialog.aktivitetId, valgtDialog.id]);

    const breakpoint = useBreakpoint();
    const isSyncingKladd = [Status.PENDING, Status.RELOADING].includes(oppdaterStatus);
    const memoedHandleSubmit = useMemo(() => {
        return handleSubmit((data) => onSubmit(data));
    }, [onSubmit]);
    const args = useMemo(() => {
        return { isSyncingKladd, noeFeilet, onSubmit: memoedHandleSubmit };
    }, [isSyncingKladd, noeFeilet, memoedHandleSubmit]);

    // Important! Avoid re-render of textarea-input because it loses focus
    const Input = useCallback(() => {
        if (!compactMode) {
            return <MeldingBottomInput dialog={valgtDialog} />;
        } else if (visAktivitet && [Breakpoint.md, Breakpoint.lg, Breakpoint.xl].includes(breakpoint)) {
            return <MeldingBottomInput dialog={valgtDialog} />;
        } else if ([Breakpoint.initial, Breakpoint.sm, Breakpoint.md].includes(breakpoint)) {
            return <MeldingBottomInput dialog={valgtDialog} />;
        } else {
            return <MeldingSideInput dialog={valgtDialog} />;
        }
    }, [breakpoint, compactMode, valgtDialog, visAktivitet]);

    if (!kanSendeHenveldelse) return null;
    return (
        <FormProvider {...formHandlers}>
            <MeldingInputContext.Provider value={args}>
                <Input />
            </MeldingInputContext.Provider>
        </FormProvider>
    );
};

export default MeldingInputBox;
