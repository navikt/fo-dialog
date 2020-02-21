import React, { useState } from 'react';
import { Bruker, DialogData } from '../../utils/Typer';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { useDialogContext, useFnrContext, useUserInfoContext, useViewContext } from '../Provider';
import DialogCheckboxesVisible from './DialogCheckboxes';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFormstate from '@nutgaard/use-formstate';
import { nyHenvendelse, oppdaterFerdigBehandlet, oppdaterVenterPaSvar } from '../../api/dialog';
import Textarea from '../../felleskomponenter/input/textarea';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendtNyHenvendelse } from '../ViewState';
import { isPending } from '@nutgaard/use-async';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

const maxMeldingsLengde = 5000;

interface Props {
    dialog: DialogData;
}

function validerMelding(melding: string) {
    if (melding.length > maxMeldingsLengde) {
        return `Meldingen kan ikke være mer enn ${maxMeldingsLengde} tegn.`;
    }
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding.';
    }
}

// On reply from NAV, clear the "waiting on answer from NAV" flag. On reply from user, set the "waiting on answer from NAV" flag.
function resolveFerdigBehandlet(bruker: Bruker | null, dialog: DialogData) {
    if (bruker!.erVeileder && !dialog.ferdigBehandlet) {
        return true;
    } else if (bruker!.erBruker && dialog.ferdigBehandlet) {
        return false;
    } else {
        return dialog.ferdigBehandlet;
    }
}

// On reply from NAV, set the "waiting on answer from user" flag. On reply from user, clear the "waiting on answer from user" flag.
function resolveVenterPaSvar(bruker: Bruker | null, dialog: DialogData) {
    if (bruker!.erVeileder && !dialog.venterPaSvar) {
        return true;
    } else if (bruker!.erBruker && dialog.venterPaSvar) {
        return false;
    } else {
        return dialog.venterPaSvar;
    }
}

const validator = useFormstate({
    melding: validerMelding
});

const initalValues = {
    melding: ''
};

export function DialogInputBox(props: Props) {
    const bruker = useUserInfoContext();
    const dialoger = useDialogContext();
    const dialogLaster = isPending(dialoger, true);
    const [noeFeilet, setNoeFeilet] = useState(false);
    const fnr = useFnrContext();

    const { viewState, setViewState } = useViewContext();

    const valgtDialog = props.dialog;

    const [ferdigBehandlet, setFerdigBehandlet] = useState(valgtDialog.ferdigBehandlet);
    const [venterPaSvar, setVenterPaSvar] = useState(valgtDialog.venterPaSvar);

    const state = validator(initalValues);

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
                const ferdigBehandlet = resolveFerdigBehandlet(bruker, dialog);
                return oppdaterFerdigBehandlet(fnr, valgtDialog.id, ferdigBehandlet);
            })
            .then(dialog => {
                const venterPaSvar = resolveVenterPaSvar(bruker, dialog);
                return oppdaterVenterPaSvar(fnr, valgtDialog.id, venterPaSvar);
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
                        showErrorOnSubmit={true}
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
