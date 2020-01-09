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
import { sendtNyHenvendelse } from '../ViewState';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

const maxMeldingsLengde = 5000;

interface Props {
    dialog: DialogData;
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
    melding: validerMelding
});

const initalValues = {
    melding: ''
};

export function DialogInputBox(props: Props) {
    const bruker = useUserInfoContext();
    const dialoger = useDialogContext();
    const [noeFeilet, setNoeFeilet] = useState(false);
    const fnr = useFnrContext();

    const { viewState, setViewState } = useViewContext();

    const valgtDialog = props.dialog;

    const [ferdigBehandlet, setFerdigBehandlet] = useState(valgtDialog.ferdigBehandlet);
    const [venterPaSvar, setVenterPaSvar] = useState(valgtDialog.venterPaSvar);

    const state = validator(initalValues);

    const toggleFerdigBehandlet = (nyFerdigBehandletVerdi: boolean) => {
        setFerdigBehandlet(nyFerdigBehandletVerdi);
        oppdaterFerdigBehandlet(fnr, valgtDialog.id, nyFerdigBehandletVerdi);
        dialoger.rerun();
    };

    const toggleVenterPaSvar = (nyVenterPaSvarVerdi: boolean) => {
        setVenterPaSvar(nyVenterPaSvarVerdi);
        oppdaterVenterPaSvar(fnr, valgtDialog.id, nyVenterPaSvarVerdi);
        dialoger.rerun();
    };

    const onSubmit = (data: { melding: string }) => {
        const { melding } = data;
        return nyHenvendelse(fnr, melding, valgtDialog.id)
            .then(dialog => {
                setNoeFeilet(false);
                state.reinitialize(initalValues);
                setViewState(sendtNyHenvendelse(viewState));

                //Todo this should be a promise
                return dialoger.rerun();
            })
            .catch(() => setNoeFeilet(true));
    };

    return (
        <>
            <form onSubmit={state.onSubmit(onSubmit)} noValidate>
                <div className="skriv-melding label-sr-only">
                    <Textarea
                        label="Skriv en melding om arbeid og oppfølging"
                        placeholder="Skriv en melding om arbeid og oppfølging"
                        textareaClass="autosizing-textarea"
                        maxLength={maxMeldingsLengde}
                        visTellerFra={1000}
                        {...state.fields.melding}
                    />
                    <Hovedknapp title="Send" autoDisableVedSpinner spinner={state.submitting}>
                        Send
                    </Hovedknapp>
                </div>
                <DialogCheckboxesVisible
                    toggleFerdigBehandlet={toggleFerdigBehandlet}
                    toggleVenterPaSvar={toggleVenterPaSvar}
                    ferdigBehandlet={ferdigBehandlet}
                    venterPaSvar={venterPaSvar}
                    visible={bruker!.erVeileder}
                />
                <AlertStripeFeilVisible visible={noeFeilet}>
                    Det skjedde en alvorlig feil. Prøv igjen senere
                </AlertStripeFeilVisible>
            </form>
        </>
    );
}

export default visibleIfHoc(DialogInputBox);
