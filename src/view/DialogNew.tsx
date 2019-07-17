import React, { FormEvent } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { fetchData } from '../utils/fetch';

import './dialognew.less';

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

export function DialogNew() {
    const tema = useFieldState('', validerTema);
    const melding = useFieldState('', validerMelding);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        tema.validate();
        melding.validate();

        if (tema.input.feil === undefined && melding.input.feil === undefined) {
            const body = JSON.stringify({
                overskrift: tema.input.value,
                tekst: melding.input.value
            });
            fetchData<DialogData>('/veilarbdialog/api/dialog/ny', {
                method: 'post',
                body
            });
        }
    }

    return (
        <div className="dialog-new">
            <form onSubmit={handleSubmit} noValidate>
                <Innholdstittel className="dialog-new__tittel">Ny Dialog</Innholdstittel>
                <Normaltekst className="dialog-new__infotekst">
                    Her kan du skrive til din veileder om arbeid og oppfølging. Du vil få svar i løpet av noen dager.
                </Normaltekst>
                <Input className="dialog-new__temafelt" label={'Tema:'} placeholder="Skriv her" {...tema.input} />
                <div className="dialog-new__skriv-melding">
                    <Textarea
                        label="Melding"
                        placeholder="Skriv en melding om arbeid og oppfølging"
                        {...melding.input}
                        // TODO Lag PR til nav-frontend som fikser textarea sin onChange. Burde bruke `React.ChangeEvent` fremfor dagens `React.SyntheticEvent`.
                        onChange={melding.input.onChange as any}
                    />
                    <Hovedknapp htmlType={'submit'} title="Send">
                        Send
                    </Hovedknapp>
                </div>
            </form>
        </div>
    );
}
