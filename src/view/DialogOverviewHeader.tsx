import React from "react";

import {Knapp} from "nav-frontend-knapper";
import {Checkbox} from "nav-frontend-skjema";




export function DialogOverviewHeader(){

    return (<div className="dialog-overview__header">
        <Knapp>Ny dialog</Knapp>
        <Checkbox label={"Viktige Meldinger"}/>
    </div>)
}
