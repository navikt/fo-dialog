import React from "react";
import Snakkeboble from "nav-frontend-snakkeboble";
import {HenvendelseData} from "../utils/typer";

interface Props {
    henvendelseData: HenvendelseData;
}


export function Henvendelse(props: Props) {
    const pilHoyre = true //erMeldingFraNav(props.henvendelseData.avsender)
    const dato = props.henvendelseData.sendt;

    return  <>
    <Snakkeboble pilHoyre={pilHoyre}>{props.henvendelseData.tekst}</Snakkeboble> </>

}