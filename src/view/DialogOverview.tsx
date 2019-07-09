import React from "react";
import {DialogData} from "../utils/typer";
import {DialogPreview} from "./DialogPreview";
import {DialogOverviewHeaderVisible} from "./DialogOverviewHeader";
import { useOppfolgingContext} from "../Context";

import "./dialogoverview.less"

interface Props {
    dialogData: DialogData[];
}

export function DialogOverview(props: Props) {
    const oppfolgingData = useOppfolgingContext();

    const erUnderOppfolging = oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;
    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return null
    } else{
        return <div className="dialog-overview">
            <DialogOverviewHeaderVisible visible={oppfolgingData!.underOppfolging}/>
            <div className="dialog-overview__preview-list">
                {props.dialogData.map((dialog) => <DialogPreview dialog={dialog} key={dialog.id}/>)}
            </div>
        </div>
        }
}
