import React from "react"
import {DialogData} from "../utils/typer";


interface Props {
    dialogdata: DialogData[];
}

export function Dialoger(props: Props) {

    return <>
        {props.dialogdata.map((dialogen) => <p> {dialogen.overskrift}</p>)}
        </>
}