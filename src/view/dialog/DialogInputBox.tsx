import React, { FormEvent, useState } from 'react';
import UseFieldState from '../../utils/UseFieldState';
import { DialogData } from '../../utils/Typer';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import HenvendelseInput from '../henvendelse/HenvendelseInput';
import { fetchData, fnrQuery } from '../../utils/Fetch';
import { useDialogContext, useFnrContext, useUserInfoContext } from '../Provider';
import { useHistory, useParams } from 'react-router';
import DialogCheckboxesVisible from './DialogCheckboxes';
import { hasData } from '@nutgaard/use-fetch';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

interface Props {
    dialog: DialogData;
}

function validerMelding(melding: string): string | null {
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding.';
    } else {
        return null;
    }
}

export function DialogInputBox(props: Props) {
    const bruker = useUserInfoContext();
    const dialoger = useDialogContext();
    const melding = UseFieldState('', validerMelding);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitfeil, setSubmitfeil] = useState<boolean>(false);
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const history = useHistory();
    const fnr = useFnrContext();
    const query = fnrQuery(fnr);

    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    const [ferdigBehandlet, setFerdigBehandlet] = useState(valgtDialog ? valgtDialog.ferdigBehandlet : true);
    const [venterPaSvar, setVenterPaSvar] = useState(valgtDialog ? valgtDialog.venterPaSvar : false);

    const toggleFerdigBehandlet = (nyFerdigBehandletVerdi: boolean) => {
        setFerdigBehandlet(nyFerdigBehandletVerdi);
        fetchData<DialogData>(
            `/veilarbdialog/api/dialog/${valgtDialog!.id}/ferdigbehandlet/${nyFerdigBehandletVerdi}${query}`,
            {
                method: 'put'
            }
        );
        dialoger.rerun();
    };
    const toggleVenterPaSvar = (nyVenterPaSvarVerdi: boolean) => {
        setVenterPaSvar(nyVenterPaSvarVerdi);
        fetchData<DialogData>(
            `/veilarbdialog/api/dialog/${valgtDialog!.id}/venter_pa_svar/${nyVenterPaSvarVerdi}${query}`,
            {
                method: 'put'
            }
        );
        dialoger.rerun();
    };

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        melding.validate();
        var dialg: DialogData = props.dialog;
        if (!melding.error) {
            setSubmitting(true);
            const body = JSON.stringify({
                dialogId: dialg.id,
                overskrift: dialg.overskrift,
                tekst: melding.input.value
            });
            fetchData<DialogData>(`/veilarbdialog/api/dialog${query}`, {
                method: 'POST',
                body
            })
                .then(
                    function(response) {
                        melding.reset();
                        console.log('Posted endret dialog!', response);
                        dialoger.rerun();
                        history.push('/' + response.id);
                    },
                    function(error) {
                        console.log('Failed while posting endret dialog!', error);
                        setSubmitfeil(true);
                    }
                )
                .then(() => setSubmitting(false));
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <HenvendelseInput melding={melding} submitting={submitting} />
                <DialogCheckboxesVisible
                    toggleFerdigBehandlet={toggleFerdigBehandlet}
                    toggleVenterPaSvar={toggleVenterPaSvar}
                    ferdigBehandlet={ferdigBehandlet}
                    venterPaSvar={venterPaSvar}
                    visible={bruker!.erVeileder}
                />
                <AlertStripeFeilVisible visible={submitfeil}>
                    Det skjedde en alvorlig feil. Prøv igjen senere
                </AlertStripeFeilVisible>
            </form>
        </>
    );
}

export default visibleIfHoc(DialogInputBox);
