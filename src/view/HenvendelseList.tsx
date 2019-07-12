import {HenvendelseData} from "../utils/typer";
import React from "react";
import {Henvendelse} from "./Henvendelse";

import './henvendelseList.less'

interface Props {
    henvendelseDataList: HenvendelseData[]
}

export function HenvendelseList(props: Props) {
    if (!props.henvendelseDataList) {
        return null;
    }

    const henvendelser = props.henvendelseDataList
        .map((henvendelse) => (
            <div key={henvendelse.id} className="henvendelse-list__henvendelse">
                <Henvendelse henvendelseData={henvendelse}/>
            </div>
        )
    );

    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport">
                {henvendelser}
            </div>
        </div>
    );
}