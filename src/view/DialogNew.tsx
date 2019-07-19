import React, { FormEvent } from 'react';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import useFieldState from '../utils/useFieldState';
import { DialogData, NyDialogMeldingData } from '../utils/typer';
import { fetchData } from '../utils/fetch';
import { useDialogContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import HenvendelseInput from '../component/HenvendelseInput';

import './dialognew.less';
import './Dialog.less';

interface Props extends RouteComponentProps<{}> {}

function DialogNew(props: Props) {
    const tema = useFieldState('', validerTema);
    const melding = useFieldState('', validerMelding);
    const dialoger = useDialogContext();

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

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        tema.validate();
        melding.validate();
        if (tema.input.feil !== undefined || melding.input.feil !== undefined) {
            const nyDialogData: NyDialogMeldingData = {
                dialogId: null,
                overskrift: tema.input.value,
                tekst: melding.input.value
            };
            const body = JSON.stringify(nyDialogData);
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', { method: 'post', body }).then(
                function(response) {
                    console.log('Posted the new dialog!', response);
                    dialoger.refetch();
                    props.history.push('/' + response.id);
                },
                function(error) {
                    console.log('Failed posting the new dialog!', error);
                }
            );
        }
    }
    if (tema.input.feil !== undefined || melding.input.feil !== undefined) {
        return (
            <div className="dialog-new">
                <form onSubmit={handleSubmit} noValidate>
                    <Innholdstittel className="dialog-new__tittel">Ny Dialog</Innholdstittel>
                    <Normaltekst className="dialog-new__infotekst">
                        Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen
                        dager.
                    </Normaltekst>
                    <div className="dialog-new__feedbacksummary">
                        <Undertittel>Fyll ut obligatoriske felt</Undertittel>
                        <ul>
                            {tema.input.feil !== undefined ? (
                                <li>
                                    <Normaltekst className="dialog-new__errortekst">
                                        {tema.input.feil.feilmelding}
                                    </Normaltekst>
                                </li>
                            ) : (
                                ''
                            )}
                            {melding.input.feil !== undefined ? (
                                <li>
                                    <Normaltekst className="dialog-new__errortekst">
                                        {melding.input.feil.feilmelding}
                                    </Normaltekst>
                                </li>
                            ) : (
                                ''
                            )}
                        </ul>
                    </div>
                    <Input className="dialog-new__temafelt" label={'Tema:'} placeholder="Skriv her" {...tema.input} />
                    <HenvendelseInput melding={melding} />
                </form>
            </div>
        );
    } else {
        return (
            <div className="dialog-new">
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
        );
    }
}

export default withRouter(DialogNew);
