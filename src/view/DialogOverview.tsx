import React from "react";

import {DialogData} from "../utils/typer";
import {DialogPreview} from "./DialogPreview";
import {DialogOverviewHeader} from "./DialogOverviewHeader";


interface Props {
    dialogData: DialogData[];
}

export function DialogOverview(props: Props){

    return <div className="dialog-overview">
        <DialogOverviewHeader/>
        <div className="dialog-overview__preview-list">
            {props.dialogData.map((dialog, i) => <DialogPreview dialog={dialog}/>)}
        </div>
    </div>
}