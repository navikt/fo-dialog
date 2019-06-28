import {HenvendelseData} from "../utils/typer";
import React from "react";
import {Henvendelse} from "./Henvendelse";


interface Props {
    henvendelseDataList: HenvendelseData[]

}

export function HenvendelseList(props: Props) {
    return <> {props.henvendelseDataList
        .reverse()
        .map( (henvendelse) => <div key={henvendelse.id}>
            <Henvendelse henvendelseData = {henvendelse}/>
    </div>
    )} </>
}