import React from "react";

import {EtikettAdvarsel, EtikettFokus} from "nav-frontend-etiketter";

import {DialogData} from "../utils/typer";

interface Props {
    dialog: DialogData;
}

export function EtikettListe(props: Props){

    const list = [];

    if (props.dialog.venterPaSvar){
        list.push(<EtikettFokus className="dialog-preview__etikett" children="NAV venter på svar fra deg"/>)
    }
    if (props.dialog.egenskaper.length>0){
        list.push(<EtikettAdvarsel className="dialog-preview__etikett" children="Viktig melding"/>)
    }
    if (!props.dialog.ferdigBehandlet){
        list.push(<EtikettFokus className="dialog-preview__etikett" children="Venter på svar fra NAV"/>)
    }

    return (<>
            {list}
        </>
    )
}