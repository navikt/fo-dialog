import React, {useContext} from "react";
import Lenke from "nav-frontend-lenker";
import {Undertittel} from "nav-frontend-typografi";
import {HoyreChevron} from "nav-frontend-chevron";
import {Checkbox} from "nav-frontend-skjema";
import {DialogData} from "../utils/typer";
import {OppfolgingContext} from "../Context";


interface Props {
    dialog: DialogData;
}


export function DialogHeader(props: Props) {
    const oppfolgingData = useContext(OppfolgingContext);

    return (
        <>
            <Lenke href="/dialog">
                <Undertittel>
                    Aktivitet: {props.dialog.aktivitetId}
                    <HoyreChevron/>
                </Undertittel>
            </Lenke>
            {oppfolgingData!.underOppfolging ?
                <div className="checkbox-block">
                    <Checkbox
                        label='Venter på svar fra NAV'
                        checked={!props.dialog.venterPaSvar}
                        className="checkbox-block__item"/>
                    <Checkbox
                        label='Venter på svar fra bruker'
                        checked={props.dialog.venterPaSvar}
                        className="checkbox-block__item"/>
                </div>
                :<></>
            }

        </>)
}