import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Textarea } from '@navikt/ds-react';
import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AlertStripeVisible from '../../../felleskomponenter/AlertStripeVisible';
import loggEvent from '../../../felleskomponenter/logging';
import { DialogData } from '../../../utils/Typer';
import { UpdateTypes, dispatchUpdate } from '../../../utils/UpdateEvent';
import { useDialogContext } from '../../DialogProvider';
import { useKladdContext } from '../../KladdProvider';
import { useOppfolgingContext } from '../../OppfolgingProvider';
import { dataOrUndefined, useViewContext } from '../../Provider';
import { HandlingsType, sendtNyHenvendelse } from '../../ViewState';
import useHenvendelseStartTekst from '../UseHenvendelseStartTekst';

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

const HenvendelseInputBox = (props: Props) => {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    const { hentDialoger, nyHenvendelse } = useDialogContext();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useHenvendelseStartTekst();

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

    if (!oppfolging?.underOppfolging || valgtDialog.historisk) {
        return null;
    }

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
        formState: { errors, isDirty, isSubmitting }
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
        return nyHenvendelse(melding, valgtDialog)
            .then((dialog) => {
                slettKladd(valgtDialog.id, valgtDialog.aktivitetId);
                return dialog;
            })
            .then(hentDialoger)
            .then(() => {
                setNoeFeilet(false);
                reset();
                setViewState(sendtNyHenvendelse(viewState));
                dispatchUpdate(UpdateTypes.Dialog);
            })
            .catch((e) => {
                console.log({ e });
                setNoeFeilet(true);
            });
    };

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))} noValidate autoComplete="off">
            {kanSendeHenveldelse ? (
                <div className="flex items-end space-x-4">
                    <Textarea
                        className="grow"
                        {...register('melding')}
                        onChange={(event) => {
                            onChange(event);
                            register('melding').onChange(event);
                        }}
                        error={errors.melding && errors.melding.message}
                        label={'Skriv om arbeid og oppfølging'}
                        hideLabel
                        placeholder={'Skriv om arbeid og oppfølging'}
                        minRows={props.erBruker ? 2 : 3}
                    />
                    <Button title="Send" loading={isSubmitting} disabled={!isDirty}>
                        Send
                    </Button>
                </div>
            ) : null}

            <AlertStripeVisible variant="error" visible={noeFeilet}>
                Noe gikk dessverre galt med systemet. Prøv igjen senere.
            </AlertStripeVisible>
        </form>
    );
};

export default HenvendelseInputBox;
