import React from "react";
import Lenke from "nav-frontend-lenker";
import {Undertittel} from "nav-frontend-typografi";
import {HoyreChevron} from "nav-frontend-chevron";
import {DialogData} from "../utils/typer";
import { useOppfolgingContext} from "../Context";
import {DialogHeaderCheckboxes} from "./DialogHeaderCheckboxes";


interface Props {
    dialog: DialogData;
}


export function DialogHeader(props: Props) {
    const oppfolgingData = useOppfolgingContext();

    return (
        <>
            <Lenke href="/dialog">
                <Undertittel>
                    Aktivitet: {props.dialog.aktivitetId}
                    <HoyreChevron/>
                </Undertittel>
            </Lenke>
            {oppfolgingData!.underOppfolging ? <DialogHeaderCheckboxes dialog={props.dialog}/> :null}
        </>)
}