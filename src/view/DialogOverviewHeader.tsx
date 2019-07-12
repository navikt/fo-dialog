import React from "react";
import {Flatknapp} from "nav-frontend-knapper";
import {visibleIfHoc} from "../component/hoc/visibleIfHoc";
import {DialogData} from "../utils/typer";
import {Checkbox} from "../component/checkbox/Checkbox";

interface Props {
    dialogData: DialogData[];
}

export function DialogOverviewHeader(props: Props) {

    const brukerHarViktigeDialoger = !!props.dialogData.filter((dialog) => dialog.egenskaper.length > 0).length;

    return (
        <div className="dialog-overview__header">
            <Flatknapp>
                Ny dialog
            </Flatknapp>
            <Checkbox label={"Viktige meldinger"} visible={brukerHarViktigeDialoger}/>
        </div>)
}

export const DialogOverviewHeaderVisible = visibleIfHoc(DialogOverviewHeader);

