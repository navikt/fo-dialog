import {DialogData} from "../utils/typer";
import React from "react";
import {DialogPreview} from "./DialogPreview";


interface Props {
    dialogData: DialogData[];
}

export function DialogOverview(props: Props){

    return <>
        {props.dialogData.map((dialog, i) => <DialogPreview dialog={dialog}/>)}
    </>
}