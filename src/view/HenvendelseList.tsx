import {HenvendelseData} from "../utils/typer";
import React from "react";
import {Henvendelse} from "./Henvendelse";


interface Props {
    henvendelseDataList: HenvendelseData[]

}

export function HenvendelseList(props: Props) {
    return <> {props.henvendelseDataList.map( (henvendelseData, i) => <div key={i}>
            <Henvendelse henvendelseData = {henvendelseData}/>
    </div>
    )} </>
}