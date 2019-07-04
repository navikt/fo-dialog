import React from "react";

import {DialogData} from "../utils/typer";
import {EtikettFokus, EtikettAdvarsel} from "../component/etiketter/Etiketter";
import {UserInfoContext} from "../Context";

interface Props {
    dialog: DialogData;
}


export function EtikettListe(props: Props) {

    return (<>
            <EtikettFokus className="dialog-preview__etikett dialog-preview__etikett--nav-venter"
                          children="NAV venter på svar fra deg" visible={!props.dialog.venterPaSvar}/>

            <EtikettAdvarsel className="dialog-preview__etikett" children="Viktig melding"
                             visible={props.dialog.egenskaper.length > 0}/>


            <EtikettFokus className="dialog-preview__etikett dialog-preview__etikett--bruker-venter"
                          children="Venter på svar fra NAV"
                          visible={!props.dialog.ferdigBehandlet}/>

        </>
    )
}
