import React from 'react';
import {Aktivitet, DialogData} from '../utils/typer';
import { Normaltekst } from 'nav-frontend-typografi';
import useFetch from "../utils/use-fetch";

interface Props {
    dialog: DialogData;
}

export function Aktivitetskort(props: Props) {


    if (props.dialog) {
        return (
            <div className="aktivitetkort">
                <Normaltekst>Aktivitet: {props.dialog.aktivitetId} Frist: 24.12. Arbeidsgiver: Julenissen</Normaltekst>
            </div>
        );
    }
    return null;
}
