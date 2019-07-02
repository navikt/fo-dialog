import React from "react";

import {DialogData} from "../utils/typer";
import {EtikettFokus,EtikettAdvarsel} from "../component/etiketter/Etiketter";

interface Props {
    dialog: DialogData;
}


export function EtikettListe(props: Props) {


    return (<>
            <EtikettFokus className="arbeidsrettet__dialog--preview__etikett" children="NAV venter på svar fra deg" visible={!props.dialog.venterPaSvar}/>

            <EtikettAdvarsel className="arbeidsrettet__dialog--preview__etikett" children="Viktig melding" visible={props.dialog.egenskaper.length>0}/>

            <EtikettFokus className="arbeidsrettet__dialog--preview__etikett" children="Venter på svar fra NAV" visible={!props.dialog.ferdigBehandlet}/>
        </>
    )
}
