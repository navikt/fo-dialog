import React, { FormEvent } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { fetchData } from '../utils/fetch';
import { useDialogContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import HenvendelseInput from '../component/HenvendelseInput';
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

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        tema.validate();
        melding.validate();

        if (tema.input.feil === undefined && melding.input.feil === undefined) {
            const body = JSON.stringify({
                overskrift: tema.input.value,
                tekst: melding.input.value
            });
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', { method: 'post', body }).then(
                function(response) {
                    console.log('Posted the new dialog!', response);
                    dialoger.rerun();
                    props.history.push('/' + response.id);
                },
                function(error) {
                    console.log('Failed posting the new dialog!', error);
                    //TODO inform with a user friendly message
                }
            );
        }
    }

    return (
        <div className="dialog-new">
            <div className="dialog-new__header">
                <Link to="/" className="tilbake-til-oversikt">
                    <VenstreChevron stor className="tilbake-til-oversikt__pilknapp" />
                    Oversikt
                </Link>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} noValidate>
                    <Innholdstittel className="dialog-new__tittel">Ny Dialog</Innholdstittel>
                    <Normaltekst className="dialog-new__infotekst">
                        Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen
                        dager.
                    </Normaltekst>
                    <Input className="dialog-new__temafelt" label={'Tema:'} placeholder="Skriv her" {...tema.input} />
                    <HenvendelseInput melding={melding} />
                </form>
            </div>
        </div>
    );
}

export default withRouter(DialogNew);
