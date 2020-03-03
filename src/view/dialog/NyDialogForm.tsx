import React, { useState } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import useFormstate from '@nutgaard/use-formstate';
import { useUserInfoContext } from '../Provider';
import { useHistory } from 'react-router';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import Textarea from '../../felleskomponenter/input/textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import Input from '../../felleskomponenter/input/input';
import style from './NyDialogForm.module.less';
import { StringOrNull } from '../../utils/Typer';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import { useDialogContext } from '../DialogProvider';
import useHenvendelseStartTekst from './UseHenvendelseStartTekst';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

const maxMeldingsLengde = 5000;
const veilederInfoMelding = 'Skriv en melding til brukeren';
const brukerinfomelding =
    'Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.';

function validerTema(tema: string) {
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
    const { hentDialoger, nyDialog, setVenterPaSvar } = useDialogContext();
    const bruker = useUserInfoContext();
    const history = useHistory();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const startTekst = useHenvendelseStartTekst();

    const state = validator(
        {
            tema: defaultTema ?? '',
            melding: startTekst
        },
        { startTekst }
    );

    const erVeileder = !!bruker && bruker.erVeileder;
    const infoTekst = erVeileder ? veilederInfoMelding : brukerinfomelding;

    const handleSubmit = (data: { tema: string; melding: string }) => {
        const { tema, melding } = data;
        return nyDialog(melding, tema, aktivitetId)
            .then(dialog => {
                onSubmit && onSubmit();
                history.push('/' + dialog.id);
                dispatchUpdate(UpdateTypes.Dialog);
                return dialog;
            })
            .then(dialog => {
                if (bruker?.erVeileder) {
                    return setVenterPaSvar(dialog, true);
                }
                return dialog;
            })
            .then(hentDialoger)
            .catch(() => setNoeFeilet(true));
    };

    return (
        <div className={style.nyDialog}>
            <form onSubmit={state.onSubmit(handleSubmit)} className={style.form} autoComplete="off">
                <Innholdstittel className={style.tittel}>Ny dialog</Innholdstittel>
                <Normaltekst className={style.infotekst}>{infoTekst}</Normaltekst>
                <Input
                    autoFocus
                    className={style.temafelt}
                    label="Tema"
                    autoComplete="off"
                    placeholder="Skriv her"
                    disabled={!!aktivitetId}
                    submittoken={state.submittoken}
                    {...state.fields.tema}
                />
                <div className={style.skrivMelding}>
                    <Textarea
                        label="Melding"
                        placeholder="Skriv en melding om arbeid og oppfølging"
                        textareaClass={style.autosizingTextarea}
                        maxLength={maxMeldingsLengde}
                        visTellerFra={1000}
                        submittoken={state.submittoken}
                        {...state.fields.melding}
                    />
                </div>

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
