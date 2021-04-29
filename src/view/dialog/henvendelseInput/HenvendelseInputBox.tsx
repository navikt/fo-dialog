import useFormstate, { SubmitHandler } from '@nutgaard/use-formstate';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import AlertStripeFeilVisible from '../../../felleskomponenter/AlertStripeFeilVisible';
import loggEvent from '../../../felleskomponenter/logging';
import { DialogData } from '../../../utils/Typer';
import { UpdateTypes, dispatchUpdate } from '../../../utils/UpdateEvent';
import { useDialogContext } from '../../DialogProvider';
import { useKladdContext } from '../../KladdProvider';
import { dataOrUndefined, useOppfolgingContext, useViewContext } from '../../Provider';
import { HandlingsType, sendtNyHenvendelse } from '../../ViewState';
import useHenvendelseStartTekst from '../UseHenvendelseStartTekst';
import HenvendelseInput from './HenvendelseInput';
import styles from './HenvendelseInputBox.module.less';

const maxMeldingsLengde = 5000;

const validerMelding = (melding: string, resten: any, props: { startTekst?: string }) => {
    if (melding.length > maxMeldingsLengde) {
        return `Meldingen kan ikke være mer enn ${maxMeldingsLengde} tegn.`;
    }
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding.';
    }
    if (melding.trim() === props.startTekst?.trim()) {
        return 'Du må endre på meldingen';
    }
};
export type HenvendelseInputBoxProps = { melding: string };
export type Handler = SubmitHandler<HenvendelseInputBoxProps>;

interface Props {
    dialog: DialogData;
    kanSendeHenveldelse: boolean;
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

    const initalValues = {
        melding: !!kladd?.tekst ? kladd.tekst : startTekst
    };

    const validator = useFormstate<HenvendelseInputBoxProps>({
        melding: validerMelding
    });

    const state = validator(initalValues);

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
        // eslint-disable-next-line
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

    const onSubmit: Handler = (data) => {
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
                state.reinitialize({ melding: startTekst });
                setViewState(sendtNyHenvendelse(viewState));
                dispatchUpdate(UpdateTypes.Dialog);
            })
            .catch(() => setNoeFeilet(true));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        timer.current && clearInterval(timer.current);
        callback.current = () => {
            timer.current = undefined;
            oppdaterKladd(props.dialog.id, props.dialog.aktivitetId, null, value);
        };
        timer.current = window.setTimeout(callback.current, 500);
    };

    return (
        <section aria-label="Ny melding">
            <form onSubmit={state.onSubmit(onSubmit)} noValidate autoComplete="off">
                <HenvendelseInput
                    laster={state.submitting}
                    state={state}
                    onChange={onChange}
                    kanSendeHenvendelse={kanSendeHenveldelse}
                    maxMeldingsLengde={maxMeldingsLengde}
                />
                <AlertStripeFeilVisible visible={noeFeilet} className={styles.feil}>
                    Noe gikk dessverre galt med systemet. Prøv igjen senere.
                </AlertStripeFeilVisible>
            </form>
        </section>
    );
};

export default HenvendelseInputBox;
