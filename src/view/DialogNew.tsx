import React, { FormEvent, useState } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { fetchData } from '../utils/fetch';
import { useDialogContext, useUserInfoContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import HenvendelseInput from '../component/HenvendelseInput';
import DialogCheckboxesVisible from './DialogCheckboxes';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Link } from 'react-router-dom';

import './dialognew.less';
import './Dialog.less';

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
        return 'Melding må ha innhold.';
    } else {
        return null;
    }
}

function DialogNew(props: Props) {
    const tema = useFieldState('', validerTema);
    const melding = useFieldState('', validerMelding);
    const dialoger = useDialogContext();
    const bruker = useUserInfoContext();

    const [ferdigBehandlet, setFerdigBehandlet] = useState(true);
    const [venterPaSvar, setVenterPaSvar] = useState(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        tema.validate();
        melding.validate();

        if (tema.input.feil === undefined && melding.input.feil === undefined) {
            const body = JSON.stringify({
                overskrift: tema.input.value,
                tekst: melding.input.value
            });
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', { method: 'post', body })
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
                        //TODO inform with a user friendly message
                    }
                );
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
        <div className="dialog-new">
            <div className="dialog-new__header">
                <Link to="/" className="tilbake-til-oversikt">
                    <VenstreChevron stor className="tilbake-til-oversikt__pilknapp" />
                    Oversikt
                </Link>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <Innholdstittel className="dialog-new__tittel">Ny Dialog</Innholdstittel>
                <Normaltekst className="dialog-new__infotekst">
                    Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.
                </Normaltekst>
                <Input className="dialog-new__temafelt" label={'Tema:'} placeholder="Skriv her" {...tema.input} />
                <HenvendelseInput melding={melding} />
                <DialogCheckboxesVisible
                    toggleFerdigBehandlet={toggleFerdigBehandlet}
                    toggleVenterPaSvar={toggleVenterPaSvar}
                    ferdigBehandlet={ferdigBehandlet}
                    venterPaSvar={venterPaSvar}
                    visible={bruker!.erVeileder}
                />
            </form>
        </div>
    );
}

export default withRouter(DialogNew);
