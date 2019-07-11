import React from "react";

import {Knapp} from "nav-frontend-knapper";
import {Checkbox} from "nav-frontend-skjema";
import WrapInReactLink from "../component/hoc/wrapInReactLink";
import {Link} from "react-router-dom";

export function DialogOverviewHeader() {
    return (
        <div className="dialog-overview__header">
            <Link to="/ny">Ny dialog</Link>
            <Checkbox label={"Viktige Meldinger"}/>
        </div>
    );
}
