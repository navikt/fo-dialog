import React from "react";

import {DialogData, StringOrUndefinedOrNull} from "../utils/typer";

import {EtikettLiten, Normaltekst, Systemtittel} from "nav-frontend-typografi";
import {LenkepanelBase} from "nav-frontend-lenkepanel";

import {EtikettListe} from "./EtikettListe";
import "./styles.less";

interface Props {
    dialog: DialogData;
}


export function DialogPreview(props: Props){


    return (
        <LenkepanelBase className="dialog-preview" >

            <div className="dialog-preview__internal-div">
                <EtikettLiten>{props.dialog.sisteDato}</EtikettLiten>
                <Systemtittel className="lenkepanel__heading"> {props.dialog.overskrift}</Systemtittel>
                <Normaltekst className="dialog-preview__last-henvendelse">{props.dialog.sisteTekst}</Normaltekst>
                <EtikettListe dialog={props.dialog}/>
            </div>

        </LenkepanelBase>)
}
