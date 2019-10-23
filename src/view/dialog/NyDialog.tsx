import React, { FormEvent, useState } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import UseFieldState from '../../utils/UseFieldState';
import { DialogData, NyDialogMeldingData } from '../../utils/Typer';
import { fetchData } from '../../utils/Fetch';
import { useDialogContext, useUserInfoContext } from '../Provider';
import { RouteComponentProps, withRouter } from 'react-router';
import HenvendelseInput from '../henvendelse/HenvendelseInput';
import DialogCheckboxesVisible from './DialogCheckboxes';
import Valideringsboks from './Valideringsboks';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Link } from 'react-router-dom';

import './NyDialog.less';

interface Props extends RouteComponentProps<{}> {}

function validerTema(tema: string): string | null {
    if (tema.trim().length === 0) {
        return 'Tema må ha innhold.';
    } else {
        return null;
    }
}

function validerMelding(melding: string): string | null {
    if (melding.trim().length === 0) {
        return 'Du må fylle ut en melding.';
    } else {
        return null;
    }
}

function NyDialog(props: Props) {
    const tema = UseFieldState('', validerTema);
    const melding = UseFieldState('', validerMelding);
    const [submitfeil, setSubmitfeil] = useState<boolean>(false);
    const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const dialoger = useDialogContext();
    const bruker = useUserInfoContext();

    const [ferdigBehandlet, setFerdigBehandlet] = useState(true);
    const [venterPaSvar, setVenterPaSvar] = useState(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setTriedToSubmit(true);
        tema.validate();
        melding.validate();

        const harIngenFeil = !tema.error && !melding.error;
        if (harIngenFeil) {
            setSubmitting(true);
            const nyDialogData: NyDialogMeldingData = {
                dialogId: null,
                overskrift: tema.input.value,
                tekst: melding.input.value
            };
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', {
                method: 'post',
                body: JSON.stringify(nyDialogData)
            })
                .then((dialog: DialogData) => {
                    if (bruker && bruker.erVeileder) {
                        const updateFerdigbehandlet = fetchData<DialogData>(
                            `/veilarbdialog/api/dialog/${dialog.id}/ferdigbehandlet/${ferdigBehandlet}`,
                            { method: 'put' }
                        );
                        const updateVenterPaSvar = fetchData(
                            `/veilarbdialog/api/dialog/${dialog.id}/venter_pa_svar/${venterPaSvar}`,
                            { method: 'put' }
                        );
                        return Promise.all([updateFerdigbehandlet, updateVenterPaSvar]).then(() => dialog);
                    }
                    return dialog;
                })
                .then(
                    function(dialog: DialogData) {
                        dialoger.rerun();
                        props.history.push('/' + dialog.id);
                    },
                    function(error) {
                        console.log('Failed posting the new dialog!', error);
                        setSubmitfeil(true);
                    }
                )
                .then(() => setSubmitting(false));
        }
    }

    const toggleFerdigBehandlet = (nyFerdigBehandletVerdi: boolean) => {
        setFerdigBehandlet(nyFerdigBehandletVerdi);
        console.log('hei, toggleFerdigBehandlet');
    };

    const toggleVenterPaSvar = (nyVenterPaSvarVerdi: boolean) => {
        setVenterPaSvar(nyVenterPaSvarVerdi);
        console.log('venterpasvar', nyVenterPaSvarVerdi);
    };

    return (
        <>
            <div className="dialog dialog-new">
                <div className="dialog-new__header">
                    <Link to="/" className="tilbake-til-oversikt">
                        <VenstreChevron stor className="tilbake-til-oversikt__pilknapp" />
                        Oversikt
                    </Link>
                </div>
                <form onSubmit={handleSubmit} noValidate className="dialog-new__form">
                    <Innholdstittel className="dialog-new__tittel">Ny dialog</Innholdstittel>
                    <Normaltekst className="dialog-new__infotekst">
                        Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen
                        dager.
                    </Normaltekst>
                    <Valideringsboks tema={tema} melding={melding} triedToSubmit={triedToSubmit} />
                    <Input
                        id="temaIn"
                        className="dialog-new__temafelt"
                        label={'Tema:'}
                        placeholder="Skriv her"
                        {...tema.input}
                        disabled={submitting}
                    />
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
            </div>
        </>
    );
}

const AlertStripeFeilVisible = visibleIfHoc(AlertStripeFeil);

export default withRouter(NyDialog);
