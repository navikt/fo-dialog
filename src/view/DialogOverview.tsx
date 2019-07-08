import React from "react";

import {DialogData} from "../utils/typer";
import {DialogPreview} from "./DialogPreview";
import {DialogOverviewHeader} from "./DialogOverviewHeader";

import "./dialogoverview.less"

interface Props {
    dialogData: DialogData[];
}

export function DialogOverview(props: Props){

    return <div className="dialog-overview">
        <DialogOverviewHeader dialogData={props.dialogData} />
        <div className="dialog-overview__preview-list">
            {props.dialogData.map((dialog) => <DialogPreview dialog={dialog} key={dialog.id}/>)}
        </div>
    </div>
}
