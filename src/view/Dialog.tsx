import React, { useEffect } from 'react';
import { HenvendelseList } from './HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { useDialogContext, useOppfolgingContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import { Aktivitetskort } from './Aktivitetskort';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import './Dialog.less';
import DialogInputBoxVisible from "./DialogInputBox";

interface Props extends RouteComponentProps<{ dialogId?: string }> {}

export function Dialog(props: Props) {
    const oppfolgingData = useOppfolgingContext();
    const dialoger = useDialogContext();
    const dialogId = props.match.params.dialogId;
    const valgtDialog = dialoger.data!.find(dialog => dialog.id === dialogId);

    useEffect(() => {
        if (valgtDialog && !valgtDialog.lest) {
            fetch('/veilarbdialog/api/dialog/lest', {
                method: 'PUT',
                body: JSON.stringify({
                    lest: true,
                    dialogId: valgtDialog.id
                })
            }).then(() => dialoger.refetch());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valgtDialog]);

    if (dialoger.data && dialoger.data.length === 0) {
        return (
            <div className="dialog">
                <Innholdstittel>Dialog</Innholdstittel>
                <Normaltekst>Her kan du sende melding til veilederen din om arbeid og oppfølging.</Normaltekst>
                <Normaltekst>Du kan forvente svar i løpet av noen dager.</Normaltekst>
                <Normaltekst>Klikk på "Ny dialog"</Normaltekst>
            </div>
        );
    } else {
        if (!valgtDialog) {
            return (
                <div className="dialog">
                    <Innholdstittel>Dialog</Innholdstittel>
                    <Normaltekst>Detaljer for valgt dialog vises her.</Normaltekst>
                    <Normaltekst> - Du kan velge en dialog fra oversikten, </Normaltekst>
                    <Normaltekst> - Du kan klikke på "Ny Dialog" for å starte en ny en.</Normaltekst>
                </div>
            );
        }
        return (
            <>
                <div className="dialog">
                    <DialogHeader dialog={valgtDialog} />
                    <HenvendelseList henvendelseDataList={valgtDialog.henvendelser} />
                    <DialogInputBoxVisible dialog={valgtDialog} visible={oppfolgingData!.underOppfolging} />
                </div>
                <Aktivitetskort dialog={valgtDialog} />
            </>
        );
    }
}

export default withRouter(Dialog);