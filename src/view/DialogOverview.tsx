import React, {useContext} from "react";

import {DialogData} from "../utils/typer";
import {DialogPreview} from "./DialogPreview";
import {DialogOverviewHeader} from "./DialogOverviewHeader";


import "./dialogoverview.less"
import {OppfolgingContext} from "../Context";

interface Props {
    dialogData: DialogData[];
}

export function DialogOverview(props: Props){
    const oppfolgingData = useContext(OppfolgingContext);

    const erUnderOppfolging= oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;

    if(!erUnderOppfolging && !harOppfolgingsPerioder) { return null;}

    return <div className="dialog-overview">
        <DialogOverviewHeader/>
        <div className="dialog-overview__preview-list">
            {props.dialogData.map((dialog) => <DialogPreview dialog={dialog} key={dialog.id}/>)}
        </div>
    </div>
}
