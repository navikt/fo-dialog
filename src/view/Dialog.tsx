import React, { useEffect } from 'react';
import { HenvendelseList } from './HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { useDialogContext, useOppfolgingContext } from '../Context';
import { RouteComponentProps, withRouter } from 'react-router';
import { Aktivitetskort } from './Aktivitetskort';
import { Normaltekst } from 'nav-frontend-typografi';
import DialogInputBoxVisible from './DialogInputBox';
import { ReactComponent as IngenDialoger } from './dialogIngen.svg';
import { ReactComponent as IngenValgteDialoger } from './dialogIngenValgt.svg';

import './Dialog.less';

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
            <div className="dialog__tom">
                <IngenDialoger />
                <Normaltekst>Her kan du sende melding til veilederen din om arbeid og oppfølging.</Normaltekst>
                <Normaltekst>Du kan forvente svar i løpet av noen dager.</Normaltekst>
            </div>
        );
    } else {
        if (!valgtDialog) {
            return (
                <div className="dialog__maavelges">
                    <IngenValgteDialoger />
                    <Normaltekst>Velg en dialog for å lese den</Normaltekst>
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
