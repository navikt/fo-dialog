import React, { useContext } from "react"
import { DialogData} from "../utils/typer";
import { UserInfoContext } from "../Context";



interface Props {
    dialogdata: DialogData[];
}

export function Dialoger(props: Props) {
    return <>
        {props.dialogdata.map((dialogen, i) => <p key={i}> {dialogen.overskrift}</p>)}
        </>
}

