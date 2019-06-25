import React from "react";
import Snakkeboble from "nav-frontend-snakkeboble";
import {HenvendelseData, StringOrUndefinedOrNull} from "../utils/typer";
import {getFormattedDate} from "../utils/functions";
import './henvendelse.less';

interface Props {
    henvendelseData: HenvendelseData;
}


export function Henvendelse(props: Props) {
    const erMeldingFraVeileder = props.henvendelseData.avsender === 'VEILEDER' ? true : false;
    const date: string = getFormattedDate(props.henvendelseData.sendt)
    return  <div className={"henvendelse"}>
    <Snakkeboble
        topp={date}
        pilHoyre={erMeldingFraVeileder}
        ikonClass={props.henvendelseData.avsender === 'VEILEDER' ? 'veileder' : `bruker`}>
        {props.henvendelseData.tekst}
    </Snakkeboble> </div>

}
