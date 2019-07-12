import React from "react";

import {visibleIfHoc} from "../component/hoc/visibleIfHoc";
import {DialogData} from "../utils/typer";
import {Checkbox} from "../component/checkbox/Checkbox";
import {Link} from "react-router-dom";

interface Props {
    dialogData: DialogData[];
}

export function DialogOverviewHeader(props: Props) {

    const brukerHarViktigeDialoger = !!props.dialogData.filter((dialog) => dialog.egenskaper.length > 0).length;

    return (
        <div className="dialog-overview__header">
            <Link to={"/ny"}>Ny dialog</Link>
            <Checkbox label={"Viktige meldinger"} visible={brukerHarViktigeDialoger}/>
        </div>)
}

export const DialogOverviewHeaderVisible = visibleIfHoc(DialogOverviewHeader);

