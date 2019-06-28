import React from "react"
import { Sidetittel } from "nav-frontend-typografi";
import { ReactComponent as DialogIcon} from "./dialog.svg";

import './DialogBanner.less'

export function DialogBanner () {
    return (
        <div className="dialogbanner">
            <div className="sidetittel-container">
                <DialogIcon className="dialog-ikon"/>
                <Sidetittel className="dialog-sidetittel">Dialog med din veileder</Sidetittel>
            </div>
        </div>
    )
}