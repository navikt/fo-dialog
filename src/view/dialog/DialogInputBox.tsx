import React, { useState } from 'react';
import { DialogData } from '../../utils/Typer';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { useDialogContext, useFnrContext, useUserInfoContext, useViewContext } from '../Provider';
import DialogCheckboxesVisible from './DialogCheckboxes';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFormstate from '@nutgaard/use-formstate';
import { nyHenvendelse, oppdaterFerdigBehandlet, oppdaterVenterPaSvar } from '../../api/dialog';
import Textarea from '../../felleskomponenter/input/textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import { HandlingsType, sendtNyHenvendelse } from '../ViewState';
import { isPending } from '@nutgaard/use-async';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import UseHenvendelseStartTekst from './UseHenvendelseStartTekst';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

const maxMeldingsLengde = 5000;

interface Props {
    dialog: DialogData;
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
    melding: validerMelding
});

export function DialogInputBox(props: Props) {
    const bruker = useUserInfoContext();
    const dialoger = useDialogContext();
    const dialogLaster = isPending(dialoger, true);
    const [noeFeilet, setNoeFeilet] = useState(false);
    const fnr = useFnrContext();
    const startTekst = UseHenvendelseStartTekst();

    const { viewState, setViewState } = useViewContext();

    const valgtDialog = props.dialog;

    const [ferdigBehandlet, setFerdigBehandlet] = useState(valgtDialog.ferdigBehandlet);
    const [venterPaSvar, setVenterPaSvar] = useState(valgtDialog.venterPaSvar);

    const initalValues = {
        melding: startTekst
    };

    const state = validator(initalValues, { startTekst });

    const toggleFerdigBehandlet = (nyFerdigBehandletVerdi: boolean) => {
        setFerdigBehandlet(nyFerdigBehandletVerdi);
        oppdaterFerdigBehandlet(fnr, valgtDialog.id, nyFerdigBehandletVerdi).then(dialoger.rerun);
    };

    const toggleVenterPaSvar = (nyVenterPaSvarVerdi: boolean) => {
        setVenterPaSvar(nyVenterPaSvarVerdi);
        oppdaterVenterPaSvar(fnr, valgtDialog.id, nyVenterPaSvarVerdi).then(dialoger.rerun);
    };

    const onSubmit = (data: { melding: string }) => {
        const { melding } = data;
        return nyHenvendelse(fnr, melding, valgtDialog.id)
            .then(dialog => {
                if (bruker?.erVeileder) {
                    if (!dialog.venterPaSvar && !dialog.ferdigBehandlet) {
                        return oppdaterVenterPaSvar(fnr, valgtDialog.id, true).then(() =>
                            oppdaterFerdigBehandlet(fnr, valgtDialog.id, true)
                        );
                    }
                    if (!dialog.venterPaSvar) {
                        return oppdaterVenterPaSvar(fnr, valgtDialog.id, true);
                    }
                    if (!dialog.ferdigBehandlet) {
                        return oppdaterFerdigBehandlet(fnr, valgtDialog.id, true);
                    }
                }
                return dialog;
            })
            .then(dialog => {
                setNoeFeilet(false);
                state.reinitialize(initalValues);
                setViewState(sendtNyHenvendelse(viewState));
                setFerdigBehandlet(dialog.ferdigBehandlet);
                setVenterPaSvar(dialog.venterPaSvar);
                dialoger.rerun();
                dispatchUpdate(UpdateTypes.Dialog);
            })
            .catch(() => setNoeFeilet(true));
    };

    const laster = state.submitting || dialogLaster;
    const match = window.matchMedia ? window.matchMedia(`(min-width: 768px)`).matches : false;
    const autoFocus = match && viewState.sistHandlingsType !== HandlingsType.nyDialog;

    return (
        <>
            <form onSubmit={state.onSubmit(onSubmit)} noValidate autoComplete="off">
                <div className="skriv-melding label-sr-only">
                    <Textarea
                        label="Skriv en melding om arbeid og oppfølging"
                        placeholder="Skriv en melding om arbeid og oppfølging"
                        textareaClass="autosizing-textarea"
                        maxLength={maxMeldingsLengde}
                        visTellerFra={1000}
                        autoFocus={autoFocus}
                        submittoken={state.submittoken}
                        {...state.fields.melding}
                    />
                    <Hovedknapp title="Send" autoDisableVedSpinner spinner={laster}>
                        Send
                    </Hovedknapp>
                </div>
                <DialogCheckboxesVisible
                    toggleFerdigBehandlet={toggleFerdigBehandlet}
                    toggleVenterPaSvar={toggleVenterPaSvar}
                    ferdigBehandlet={ferdigBehandlet}
                    venterPaSvar={venterPaSvar}
                    visible={bruker!.erVeileder}
                    disabled={laster}
                />
                <AlertStripeFeilVisible visible={noeFeilet}>
                    Det skjedde en alvorlig feil. Prøv igjen senere
                </AlertStripeFeilVisible>
            </form>
        </>
    );
}

export default visibleIfHoc(DialogInputBox);
