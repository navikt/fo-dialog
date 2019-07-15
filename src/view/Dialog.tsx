import React, {useEffect} from "react";
import {HenvendelseList} from "./HenvendelseList";
import {DialogHeader} from "./DialogHeader";
import {DialogInputBoxVisible} from "./DialogInputBox";
import {useDialogContext, useOppfolgingContext} from "../Context";
import './Dialog.less';
import {RouteComponentProps, withRouter} from "react-router";
import {Aktivitetskort} from "./Aktivitetskort";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";

interface Props extends RouteComponentProps<{ dialogId?: string; }> {

}

export function Dialog(props: Props) {
    const oppfolgingData = useOppfolgingContext();
    const dialoger = useDialogContext();
    const dialogId = props.match.params.dialogId;
    const valgtDialog = dialoger.data!.find((dialog) => dialog.id === dialogId);


    useEffect(() => {
        if (valgtDialog && !valgtDialog.lest) {
            fetch("/veilarbdialog/api/dialog/lest", {
                method: 'PUT', body: JSON.stringify({
                    lest: true,
                    dialogId: valgtDialog.id
                })
            })
                .then(() => dialoger.refetch());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valgtDialog]);

    if (!valgtDialog) {
        return (
            <div className="dialog">
                <Innholdstittel>Dialog</Innholdstittel>
                <Normaltekst>Detaljer for valgt dialog vises her.</Normaltekst>
            </div>
        );
    }
    return (
        <>
            <div className="dialog">
                <DialogHeader dialog={valgtDialog}/>
                <HenvendelseList henvendelseDataList={valgtDialog.henvendelser}/>
                <DialogInputBoxVisible dialog={valgtDialog} visible={oppfolgingData!.underOppfolging}/>
            </div>
            <Aktivitetskort dialog={valgtDialog}/>
        </>
    );
}

export default withRouter(Dialog);