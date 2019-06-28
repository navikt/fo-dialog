import React from "react";

import {DialogData, StringOrUndefinedOrNull} from "../utils/typer";

import {EtikettLiten, Normaltekst, Systemtittel} from "nav-frontend-typografi";
import {LenkepanelBase} from "nav-frontend-lenkepanel";

import {EtikettListe} from "./EtikettListe";
import "./styles.less";
import {formaterHenvendelseDate} from "../utils/functions";
import {string} from "prop-types";

interface Props {
    dialog: DialogData;
}


export function DialogPreview(props: Props) {

    const datoString: string = (typeof props.dialog.sisteDato === "string") ? formaterHenvendelseDate(props.dialog.sisteDato) : "";

    return (
        <LenkepanelBase className="dialog-preview">

            <div className="dialog-preview__internal-div">
                <EtikettLiten>{datoString}</EtikettLiten>
                <Systemtittel className="lenkepanel__heading"> {props.dialog.overskrift}</Systemtittel>
                <Normaltekst className="dialog-preview__last-henvendelse">{props.dialog.sisteTekst}</Normaltekst>
                <EtikettListe dialog={props.dialog}/>
            </div>

        </LenkepanelBase>)
}
