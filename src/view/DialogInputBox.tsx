import React, {FormEvent} from "react";
import {Textarea} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import useFieldState from "../utils/useFieldState";
import {DialogData} from "../utils/typer";

function validerMelding(melding: string): string | null {
    if (melding.length === 0) {
        return "Melding må ha innhold.";
    } else if (melding.length < 10) {
        return "Meldingen må være lengre enn 10 tegn.";
    } else {
        return null;
    }
}

interface Props {
    dialog: DialogData;
}

export function DialogInputBox(props: Props){
    const melding = useFieldState('', validerMelding);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        melding.validate();
        var dialg : DialogData = props.dialog;
        if ( melding.input.feil === undefined) {
            fetch('/veilarbdialog/api/dialog/ny', {
                method: 'POST', body: JSON.stringify({
                    tekst: melding.input.value,
                    dialogId: dialg.id,
                    overskrift: dialg.overskrift,
                })
            });
        }
    }
    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="skriv-melding" >
                <Textarea
                    label='Skriv en melding til brukeren'
                    placeholder="Skriv her .."
                    {...melding.input}
                    // TODO Lag PR til nav-frontend som fikser textarea sin onChange. Burde bruke `React.ChangeEvent` fremfor dagens `React.SyntheticEvent`.
                    onChange={melding.input.onChange as any}
                />
                <Hovedknapp
                    htmlType={"submit"}
                    title="Send"
                >Send
                </Hovedknapp>
            </div>
        </form>

    )
}
