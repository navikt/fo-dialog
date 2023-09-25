import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, ErrorMessage, Textarea } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import loggEvent from '../../../felleskomponenter/logging';
import { DialogData } from '../../../utils/Typer';
import { UpdateTypes, dispatchUpdate } from '../../../utils/UpdateEvent';
import { useVisAktivitet } from '../../AktivitetToggleContext';
import { useDialogContext } from '../../DialogProvider';
import { useCompactMode } from '../../../featureToggle/FeatureToggleProvider';
import { useKladdContext } from '../../KladdProvider';
import { useViewContext } from '../../Provider';
import { HandlingsType, sendtNyMelding } from '../../ViewState';
import useMeldingStartTekst from '../UseMeldingStartTekst';
import TextareaAutosize from '@navikt/ds-react/esm/util/TextareaAutoSize';
import { useSelectedAktivitet } from '../../utils/useAktivitetId';

const maxMeldingsLengde = 5000;

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
    erBruker: boolean;
}

const MeldingInputBox = (props: Props) => {
    const { hentDialoger, nyMelding } = useDialogContext();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useMeldingStartTekst();
    const compactMode = useCompactMode();
    const visAktivitet = useVisAktivitet();
    const aktivitet = useSelectedAktivitet();

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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<MeldingFormValues>({
        defaultValues,
        resolver: zodResolver(schema)
    });

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

    return (
        <form
            className={classNames({
                'flex flex-1 flex-col overflow-hidden': compactMode && !visAktivitet
            })}
            onSubmit={handleSubmit((data) => onSubmit(data))}
            noValidate
            autoComplete="off"
        >
            {kanSendeHenveldelse ? (
                <div
                    className={classNames('', {
                        'overflow-hidden p-1': compactMode,
                        'lg:flex-col': compactMode && !aktivitet,
                        'flex lg:flex-col flex-row items-stretch ': aktivitet && compactMode && !visAktivitet,
                        'flex flex-col items-end space-y-2 sm:flex-row sm:space-y-0':
                            aktivitet && compactMode && visAktivitet,
                        'flex flex-col items-end space-y-2 sm:flex-row sm:space-y-0 ': !compactMode
                    })}
                >
                    <label htmlFor="melding_input" className="hidden ">
                        Skriv om arbeid og oppfølging
                    </label>
                    <TextareaAutosize
                        id="melding_input"
                        className={classNames(
                            'w-full grow border-2 border-gray-500 focus:border-blue-500 rounded-md p-2 overflow-auto outline-0',
                            { 'border-red-300': errors.melding }
                        )}
                        style={{ overflow: 'auto' }}
                        {...register('melding')}
                        onChange={(event) => {
                            onChange(event);
                            register('melding').onChange(event);
                        }}
                        // error={errors.melding && errors.melding.message}
                        placeholder={'Skriv om arbeid og oppfølging'}
                        minRows={compactMode && !visAktivitet ? 3 : props.erBruker ? 2 : 3}
                        maxRows={!compactMode || visAktivitet ? 10 : 100}
                    />
                    <Button
                        size={compactMode ? 'small' : 'medium'}
                        className={classNames({
                            'ml-2': !compactMode,
                            '': !aktivitet && compactMode,
                            'self-end ml-2': aktivitet && compactMode && visAktivitet,
                            'lg:mt-2 lg:self-start self-end ml-2 lg:ml-0': aktivitet && compactMode && !visAktivitet
                        })}
                        title="Send"
                        loading={isSubmitting}
                    >
                        Send
                    </Button>
                </div>
            ) : null}
            {errors.melding ? (
                <ErrorMessage className="mt-2" size="small">
                    {errors.melding.message}
                </ErrorMessage>
            ) : null}
            {noeFeilet ? (
                <Alert className="mt-4" variant="error">
                    Noe gikk dessverre galt med systemet. Prøv igjen senere.
                </Alert>
            ) : null}
        </form>
    );
};

export default MeldingInputBox;
