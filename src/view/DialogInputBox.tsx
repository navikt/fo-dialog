import React, { FormEvent } from 'react';
import useFieldState from '../utils/useFieldState';
import { DialogData } from '../utils/typer';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import HenvendelseInput from "../component/HenvendelseInput";

function validerMelding(melding: string): string | null {
    if (melding.trim().length === 0) {
        return 'Melding må ha innhold.';
    } else {
        return null;
    }
}

interface Props {
    dialog: DialogData;
}

export function DialogInputBox(props: Props) {
    const melding = useFieldState('', validerMelding);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        melding.validate();
        var dialg: DialogData = props.dialog;
        if (melding.input.feil === undefined) {
            fetch('/veilarbdialog/api/dialog/ny', {
                method: 'POST',
                body: JSON.stringify({
                    tekst: melding.input.value,
                    dialogId: dialg.id,
                    overskrift: dialg.overskrift
                })
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <HenvendelseInput melding={melding} />
        </form>
    );
}

export const DialogInputBoxVisible = visibleIfHoc(DialogInputBox);
