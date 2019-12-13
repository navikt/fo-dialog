import React, { useState } from 'react';
import { DialogData } from '../../utils/Typer';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { useDialogContext, useFnrContext, useUserInfoContext } from '../Provider';
import { useParams } from 'react-router';
import DialogCheckboxesVisible from './DialogCheckboxes';
import { hasData } from '@nutgaard/use-fetch';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import useFormstate from '@nutgaard/use-formstate';
import { nyHenvendelse, oppdaterFerdigBehandlet, oppdaterVenterPaSvar } from '../../api/dialog';
import Textarea from '../../felleskomponenter/input/textarea';
import { Hovedknapp } from 'nav-frontend-knapper';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

interface Props {
    dialog: DialogData;
}

function validerMelding(melding: string) {
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
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const fnr = useFnrContext();

    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    const [ferdigBehandlet, setFerdigBehandlet] = useState(valgtDialog ? valgtDialog.ferdigBehandlet : true);
    const [venterPaSvar, setVenterPaSvar] = useState(valgtDialog ? valgtDialog.venterPaSvar : false);

    const state = validator(initalValues);

    if (!valgtDialog) {
        return null;
    }

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

                //Todo this should be a promise
                return dialoger.rerun();
            })
            .catch(() => setNoeFeilet(true));
    };

    return (
        <>
            <form onSubmit={state.onSubmit(onSubmit)} noValidate>
                <div className="skriv-melding">
                    <Textarea
                        label="Skriv en melding om arbeid og oppfølging"
                        placeholder="Skriv en melding om arbeid og oppfølging"
                        textareaClass="autosizing-textarea"
                        maxLength={5000}
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
