import React from "react";
import Snakkeboble from "nav-frontend-snakkeboble";
import {HenvendelseData, StringOrUndefinedOrNull} from "../utils/typer";
import {getFormattedDate} from "../utils/functions";

import './henvendelse.less';
import Normaltekst from "nav-frontend-typografi/lib/normaltekst";

interface Props {
    henvendelseData: HenvendelseData;
}


export function Henvendelse(props: Props) {
    const erMeldingFraBruker = props.henvendelseData.avsender === 'BRUKER' ? true : false;
    const date: string = getFormattedDate(props.henvendelseData.sendt)
    const className: string = erMeldingFraBruker? 'ikon bruker-ikon' : 'ikon veileder-ikon'
    return  (
        <div className="henvendelse">
            <Snakkeboble
                topp={date}
                pilHoyre={erMeldingFraBruker}
                ikonClass={className}>
                <Normaltekst>{props.henvendelseData.tekst}</Normaltekst>
            </Snakkeboble>
        </div>
    )

}
