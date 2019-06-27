import React from "react";
import Snakkeboble from "nav-frontend-snakkeboble";
import {HenvendelseData} from "../utils/typer";
import { getFormattedHenvendelseDate } from "../utils/functions";
import { Normaltekst } from 'nav-frontend-typografi';

import './henvendelse.less';


interface Props {
    henvendelseData: HenvendelseData;
}


export function Henvendelse(props: Props) {
    const erMeldingFraBruker = props.henvendelseData.avsender === 'BRUKER';
    const date: string = getFormattedHenvendelseDate(props.henvendelseData.sendt);
    const className: string = erMeldingFraBruker? 'ikon bruker-ikon' : 'ikon veileder-ikon';
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
