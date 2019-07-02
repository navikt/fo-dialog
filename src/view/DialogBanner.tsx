import React from "react"
import {Sidetittel} from "nav-frontend-typografi";
import {ReactComponent as DialogIcon} from "./dialog.svg";

import './DialogBanner.less'

export function DialogBanner() {
    return (
        <div className="arbeidsrettet__dialog--dialogbanner">
            <DialogIcon className="arbeidsrettet__dialog--banner__ikon"/>
            <Sidetittel>Dialog med din veileder</Sidetittel>
        </div>
    )
}