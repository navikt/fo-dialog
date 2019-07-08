import {Checkbox} from "nav-frontend-skjema";
import React from "react";
import {DialogData} from "../utils/typer";

interface Props {
    dialog: DialogData;
}

export function DialogHeaderCheckboxes(props: Props){
    return (
        <div className="checkbox-block">
            <Checkbox
                label='Venter på svar fra NAV'
                checked={!props.dialog.venterPaSvar}
                className="checkbox-block__item"
                onChange={() => {}}
            />
            <Checkbox
                label='Venter på svar fra bruker'
                checked={props.dialog.venterPaSvar}
                className="checkbox-block__item"
                onChange={ () => {}}
            />
        </div>
    )
}