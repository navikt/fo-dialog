import React from "react";

import {Knapp} from "nav-frontend-knapper";
import {DialogData} from "../utils/typer";
import {Checkbox} from "../component/checkbox/Checkbox";

interface Props {
    dialogData: DialogData[];
}

export function DialogOverviewHeader(props: Props) {

    const brukerHarViktigeDialoger = !!props.dialogData.filter((dialog) => dialog.egenskaper.length > 0).length;

    return (<div className="dialog-overview__header">
        <Knapp>Ny dialog</Knapp>
        <Checkbox label={"Viktige meldinger"} visible={brukerHarViktigeDialoger}/>
    </div>)
}
