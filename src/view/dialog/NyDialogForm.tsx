import { zodResolver } from '@hookform/resolvers/zod';
import { Button, GuidePanel, Heading, TextField, Textarea } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { z } from 'zod';

import AlertStripeVisible from '../../felleskomponenter/AlertStripeVisible';
import loggEvent from '../../felleskomponenter/logging';
import { useRoutes } from '../../routes';
import { StringOrNull } from '../../utils/Typer';
import { UpdateTypes, dispatchUpdate } from '../../utils/UpdateEvent';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import { findKladd, useKladdContext } from '../KladdProvider';
import { cutStringAtLength } from '../utils/stringUtils';
import style from './NyDialogForm.module.less';
import useHenvendelseStartTekst from './UseHenvendelseStartTekst';

const maxMeldingsLengde = 5000;

const schema = z.object({
    tema: z.string().min(1, 'Du må skrive hva meldingen handler om').max(100, 'Tema kan ikke være mer enn 100 tegn'),
    melding: z
        .string()
        .min(1, 'Du må fylle ut en melding')
        .max(maxMeldingsLengde, `Meldingen kan ikke være mer enn ${maxMeldingsLengde}`)
});

export type NyDialogFormValues = z.infer<typeof schema>;

interface Props {
    defaultTema: string;
    setViewState: () => void;
    aktivitetId?: string;
}

const NyDialogForm = (props: Props) => {
    const { defaultTema, setViewState, aktivitetId } = props;
    const { hentDialoger, nyDialog } = useDialogContext();
    const bruker = useUserInfoContext();
    const history = useHistory();
    const { dialogRoute } = useRoutes();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useHenvendelseStartTekst();

    const { kladder, oppdaterKladd, slettKladd } = useKladdContext();
    const kladd = findKladd(kladder, null, aktivitetId);

    const [gjeldendeInput, setGjeldendeInput] = useState<{ tema?: StringOrNull; melding?: StringOrNull }>({
        tema: kladd?.overskrift,
        melding: kladd?.tekst
    });
    const timer = useRef<number | undefined>();
    const callback = useRef<() => any>();

    useEffect(() => {
        return () => {
            timer.current && clearInterval(timer.current);
            timer.current && callback.current && callback.current();
        };
    }, []);

    const erVeileder = !!bruker && bruker.erVeileder;

    const onChange = (tema?: string, melding?: string) => {
        const newTema = tema !== undefined ? tema : gjeldendeInput.tema;
        const newMelding = melding !== undefined ? melding : gjeldendeInput.melding;
        setGjeldendeInput({ tema: newTema, melding: newMelding });
        timer.current && clearInterval(timer.current);
        callback.current = () => {
            timer.current = undefined;
            oppdaterKladd(null, props.aktivitetId, newTema, newMelding);
        };
        timer.current = window.setTimeout(callback.current, 500);
    };

    const defaultValues: NyDialogFormValues = {
        tema: kladd?.overskrift ?? cutStringAtLength(defaultTema, 100, '...'),
        melding: !!kladd?.tekst ? kladd.tekst : startTekst
    };

    const onSubmit = (data: NyDialogFormValues) => {
        console.log('onsubmit data', data);
        const { tema, melding } = data;

        timer.current && clearInterval(timer.current);
        timer.current = undefined;

        loggEvent('arbeidsrettet-dialog.ny.dialog', { paaAktivitet: !!aktivitetId });
        return nyDialog(melding, tema, aktivitetId)
            .then((dialog) => {
                slettKladd(null, props.aktivitetId);
                setViewState();
                history.push(dialogRoute(dialog.id));
                dispatchUpdate(UpdateTypes.Dialog);
                return dialog;
            })
            .then(hentDialoger)
            .catch(() => setNoeFeilet(true));
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isSubmitting }
    } = useForm<NyDialogFormValues>({
        defaultValues,
        resolver: zodResolver(schema)
    });

    const meldingValue = watch('melding');

    return (
        <div className={classNames(style.nyDialog, 'bg-gray-100')}>
            <form className="p-8 space-y-8" onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off">
                <Heading size="large" level="1">
                    Start en ny dialog
                </Heading>
                {!erVeileder ? (
                    <GuidePanel>
                        Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen
                        dager.
                    </GuidePanel>
                ) : null}
                <TextField
                    label="Tema / Tittel (obligatorisk)"
                    description="Skriv kort hva dialogen skal handle om"
                    disabled={!!aktivitetId}
                    autoFocus
                    {...register('tema')}
                    error={errors.tema && errors.tema.message}
                    onChange={(event) => {
                        onChange(event.target.value, undefined);
                        register('tema').onChange(event);
                    }}
                />
                <Textarea
                    label="Melding (obligatorisk)"
                    description="Skriv om arbeid og oppfølging"
                    maxLength={5000}
                    {...register('melding')}
                    error={errors.melding && errors.melding.message}
                    value={meldingValue}
                    onChange={(event) => {
                        onChange(undefined, event.target.value);
                        register('melding').onChange(event);
                    }}
                />

                <AlertStripeVisible variant="error" visible={noeFeilet}>
                    Noe gikk dessverre galt med systemet. Prøv igjen senere.
                </AlertStripeVisible>

                <Button loading={isSubmitting} disabled={!isDirty}>
                    Send
                </Button>
            </form>
        </div>
    );
};

export default NyDialogForm;
