import React, { useEffect, useState } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import useFormstate from '@nutgaard/use-formstate';
import { useDialogContext, useFnrContext, useUserInfoContext, useViewContext } from '../Provider';
import { useHistory } from 'react-router';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Link } from 'react-router-dom';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import FormErrorSummary from '../../felleskomponenter/form-error-summary/FormErrorSummary';
import Textarea from '../../felleskomponenter/input/textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import Input from '../../felleskomponenter/input/input';
import { nyDialog, oppdaterFerdigBehandlet, oppdaterVenterPaSvar } from '../../api/dialog';
import './NyDialog.less';
import Checkbox from '../../felleskomponenter/input/checkbox';
import { div as HiddenIfDiv } from '../../felleskomponenter/HiddenIfHoc';
import { endreDialogSomVises, sendtNyDialog } from '../ViewState';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

const maxMeldingsLengde = 5000;

function validerTema(tema: string) {
    if (tema.trim().length === 0) {
        return 'Tema må ha innhold.';
    }
    if (tema.trim().length > 100) {
        return 'Tema kan ikke være mere enn 100 tegn.';
    }
}

function validerMelding(melding: string) {
    if (melding.length > maxMeldingsLengde) {
        return `Meldingen kan ikke være mere enn ${maxMeldingsLengde} tegn.`;
    }
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding.';
    }
}

const validator = useFormstate({
    tema: validerTema,
    melding: validerMelding,
    venterPaSvarFraNAV: () => undefined,
    venterPaSvar: () => undefined
});

function NyDialog() {
    const dialoger = useDialogContext();
    const bruker = useUserInfoContext();
    const history = useHistory();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const kansendeMelding = useKansendeMelding();
    const fnr = useFnrContext();
    const state = validator({
        tema: '',
        melding: '',
        venterPaSvarFraNAV: 'false',
        venterPaSvar: 'false'
    });

    const { viewState, setViewState } = useViewContext();

    //TODO should be possible to set status when creating in the api ?

    useEffect(() => {
        setViewState(endreDialogSomVises());
    }, [setViewState]);

    if (!kansendeMelding) {
        return <div className="dialog dialog-new" />;
    }

    const onSubmit = (data: { tema: string; melding: string; venterPaSvarFraNAV: string; venterPaSvar: string }) => {
        const { tema, melding, venterPaSvar, venterPaSvarFraNAV } = data;
        return nyDialog(fnr, melding, tema)
            .then(dialog => {
                if (bruker && bruker.erVeileder) {
                    const ferdigPromise = oppdaterFerdigBehandlet(fnr, dialog.id, venterPaSvarFraNAV === 'false');
                    const venterPromise = oppdaterVenterPaSvar(fnr, dialog.id, venterPaSvar === 'true');
                    return Promise.all([ferdigPromise, venterPromise]).then(() => dialog);
                }
                return dialog;
            })
            .then(dialog => {
                setNoeFeilet(false);
                setViewState(sendtNyDialog(viewState));
                dialoger.rerun();
                history.push('/' + dialog.id);
            })
            .catch(() => setNoeFeilet(true));
    };

    return (
        <div className="dialog dialog-new">
            <div className="dialog-new__header">
                <Link to="/" className="tilbake-til-oversikt">
                    <VenstreChevron stor className="tilbake-til-oversikt__pilknapp" />
                    Oversikt
                </Link>
            </div>
            <form onSubmit={state.onSubmit(onSubmit)} className="dialog-new__form">
                <Innholdstittel className="dialog-new__tittel">Ny dialog</Innholdstittel>
                <Normaltekst className="dialog-new__infotekst">
                    Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.
                </Normaltekst>
                <FormErrorSummary submittoken={state.submittoken} errors={state.errors} />

                <Input className="dialog-new__temafelt" label="Tema" placeholder="Skriv her" {...state.fields.tema} />
                <div className="skriv-melding">
                    <Textarea
                        label="Melding"
                        placeholder="Skriv en melding om arbeid og oppfølging"
                        textareaClass="autosizing-textarea"
                        maxLength={maxMeldingsLengde}
                        visTellerFra={1000}
                        {...state.fields.melding}
                    />
                </div>

                <HiddenIfDiv hidden={!!bruker && bruker.erBruker} className="checkbox-block">
                    <Checkbox
                        label="Venter på svar fra NAV"
                        className="checkbox-block__item"
                        {...state.fields.venterPaSvarFraNAV}
                    />
                    <Checkbox
                        label="Venter på svar fra bruker"
                        className="checkbox-block__item"
                        {...state.fields.venterPaSvar}
                    />
                </HiddenIfDiv>

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

export default NyDialog;
