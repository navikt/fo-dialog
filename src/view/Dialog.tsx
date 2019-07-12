import React from "react";
import {DialogData} from "../utils/typer";
import {Innholdstittel} from "nav-frontend-typografi";
import {HenvendelseList} from "./HenvendelseList";
import {DialogHeader} from "./DialogHeader";
import {AktivitetskortPreview} from "./AktivitetskortPreview";
import {DialogInputBoxVisible} from "./DialogInputBox";
import {useOppfolgingContext} from "../Context";
import './Dialog.less';
import {RouteComponentProps, withRouter} from "react-router";

interface Props extends RouteComponentProps<{ dialogId?: string; }> {
    dialogData: DialogData[];
}

function Dialog(props: Props) {

    const oppfolgingData = useOppfolgingContext();
    const dialogId = props.match.params.dialogId;
    const valgtDialog = props.dialogData.find((dialog) => dialog.id === dialogId);

    if (!valgtDialog) {

        return (
            <div className="dialog">
                <Innholdstittel>Ingen Valgt Dialog</Innholdstittel>
            </div>
        );
    }

    return (
        <div className="dialog">
            <DialogHeader dialog={valgtDialog}/>
            <HenvendelseList henvendelseDataList={valgtDialog.henvendelser}/>
            <DialogInputBoxVisible visible={oppfolgingData!.underOppfolging}/>
        </div>
    );
}

export default withRouter(Dialog);