import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import useFormstate from '@nutgaard/use-formstate';
import { useUserInfoContext } from '../Provider';
import { useHistory } from 'react-router';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { Hovedknapp } from 'nav-frontend-knapper';
import Input from '../../felleskomponenter/input/input';
import style from './NyDialogForm.module.less';
import { StringOrNull } from '../../utils/Typer';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import { useDialogContext } from '../DialogProvider';
import useHenvendelseStartTekst from './UseHenvendelseStartTekst';
import loggEvent from '../../felleskomponenter/logging';
import { findKladd, useKladdContext } from '../KladdProvider';
import EkspanderbartTekstArea from '../../felleskomponenter/textArea/TextArea';
import { SkjemaGruppe } from 'nav-frontend-skjema';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

const maxMeldingsLengde = 5000;
const veilederInfoMelding = 'Skriv en melding til brukeren';
const brukerinfomelding =
    'Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.';

function validerTema(tema: string, rest: any, props: { disabled?: boolean }) {
    if (props.disabled) {
        return undefined;
    }

    if (tema.trim().length === 0) {
        return 'Tema må ha innhold.';
    }
    if (tema.trim().length > 100) {
        return 'Tema kan ikke være mer enn 100 tegn.';
    }
}

function validerMelding(melding: string, resten: any, props: { startTekst?: string }) {
    if (melding.length > maxMeldingsLengde) {
        return `Meldingen kan ikke være mer enn ${maxMeldingsLengde} tegn.`;
    }
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding.';
    }
    if (melding.trim() === props.startTekst?.trim()) {
        return 'Du må endre på meldingen';
    }
}

const validator = useFormstate({
    tema: validerTema,
    melding: validerMelding
});

interface Props {
    defaultTema?: StringOrNull;
    onSubmit?: () => void;
    aktivitetId?: string;
}

function NyDialogForm(props: Props) {
    const { defaultTema, onSubmit, aktivitetId } = props;
    const { hentDialoger, nyDialog } = useDialogContext();
    const bruker = useUserInfoContext();
    const history = useHistory();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useHenvendelseStartTekst();

    const { kladder, oppdaterKladd, slettKladd } = useKladdContext();
    const kladd = findKladd(kladder, null, aktivitetId);

    const [tmpInput, setTmpInput] = useState<{ tema?: StringOrNull; melding?: StringOrNull }>({
        tema: kladd?.overskrift,
        melding: kladd?.tekst
    });
    const timer = useRef<number | undefined>();
    const callback = useRef<() => any>();

    const state = validator(
        {
            tema: kladd?.overskrift ?? defaultTema ?? '',
            melding: !!kladd?.tekst ? kladd.tekst : startTekst
        },
        { disabled: !!aktivitetId, startTekst }
    );

    useEffect(() => {
        return () => {
            timer.current && clearInterval(timer.current);
            timer.current && callback.current && callback.current();
        };
    }, []);

    const erVeileder = !!bruker && bruker.erVeileder;
    const infoTekst = erVeileder ? veilederInfoMelding : brukerinfomelding;

    const handleSubmit = (data: { tema: string; melding: string }) => {
        const { tema, melding } = data;

        timer.current && clearInterval(timer.current);
        timer.current = undefined;

        loggEvent('arbeidsrettet-dialog.ny.dialog', { paaAktivitet: !!aktivitetId });
        return nyDialog(melding, tema, aktivitetId)
            .then((dialog) => {
                slettKladd(null, props.aktivitetId);
                onSubmit && onSubmit();
                history.push('/' + dialog.id);
                dispatchUpdate(UpdateTypes.Dialog);
                return dialog;
            })
            .then(hentDialoger)
            .catch(() => setNoeFeilet(true));
    };

    const onChange = (tema?: string, melding?: string) => {
        const newTema = tema !== undefined ? tema : tmpInput.tema;
        const newMelding = melding !== undefined ? melding : tmpInput.melding;
        setTmpInput({ tema: newTema, melding: newMelding });
        timer.current && clearInterval(timer.current);
        callback.current = () => {
            timer.current = undefined;
            oppdaterKladd(null, props.aktivitetId, newTema, newMelding);
        };
        timer.current = window.setTimeout(callback.current, 500);
    };

    return (
        <div className={style.nyDialog}>
            <form onSubmit={state.onSubmit(handleSubmit)} className={style.form} autoComplete="off">
                <SkjemaGruppe>
                    <Normaltekst className={style.infotekst}>{infoTekst}</Normaltekst>
                    <Input
                        autoFocus
                        className={style.temafelt}
                        label="Tema"
                        autoComplete="off"
                        placeholder="Skriv hva meldingen handler om"
                        disabled={!!aktivitetId}
                        maxLength={!aktivitetId ? 101 : undefined}
                        submittoken={state.submittoken}
                        onChange={(e) => onChange(e.target.value, undefined)}
                        {...state.fields.tema}
                    />
                    <div className={style.skrivMelding}>
                        <EkspanderbartTekstArea
                            label="Melding"
                            placeholder="Skriv en melding om arbeid og oppfølging"
                            maxLength={maxMeldingsLengde}
                            visTellerFra={1000}
                            submittoken={state.submittoken}
                            onChange={(e) => onChange(undefined, e.target.value)}
                            {...state.fields.melding}
                        />
                    </div>
                </SkjemaGruppe>

                <Hovedknapp title="Send" autoDisableVedSpinner spinner={state.submitting}>
                    Send
                </Hovedknapp>

                <AlertStripeFeilVisible visible={noeFeilet}>
                    Det skjedde en alvorlig feil. Prøv igjen senere
                </AlertStripeFeilVisible>
            </form>
        </div>
    );
}

export default NyDialogForm;
