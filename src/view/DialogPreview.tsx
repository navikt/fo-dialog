import {DialogData, StringOrUndefinedOrNull} from "../utils/typer";
import NavFrontendChevron from "nav-frontend-chevron";
import {Element} from "nav-frontend-typografi";
import React from "react";
import "./styles.css";

interface Props {
    dialog: DialogData;
}


export function DialogPreview(props: Props){
    return <div className="DialogPreview">
        <div className="DialogPreviewDato">{convertDateTimeStringToNorwegianDate(props.dialog.sisteDato)}</div>
        <div className="DialogNumberOfMessages">{}</div>
        <Element>  {props.dialog.henvendelser.length}<NavFrontendChevron type={"høyre"}/> </Element>
        <h1>{props.dialog.overskrift}</h1>

        <p>{props.dialog.sisteTekst}</p>

    </div>
}


function convertDateTimeStringToNorwegianDate(dateString: StringOrUndefinedOrNull){
    if (dateString === undefined){
        return "undefined";
    }
    if (dateString === null){
        return "null";
    }

    const year = dateString.substring(0,4);

    const norwegianMonths: string[] = ["JAN","FEB","MAR","APR","MAI","JUN","JUL","AUG","SEP","OKT","NOV","DES"];
    const monthInteger: number = parseInt(dateString.substring(5,7));
    const month: string = norwegianMonths[monthInteger-1];

    const day = dateString.substring(8,10);
    return day+". "+month+" "+year;
}