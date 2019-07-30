import React, { useEffect } from 'react';
import { hasData } from '@nutgaard/use-fetch';
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
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const dialogId = props.match.params.dialogId;
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    useEffect(() => {
        if (valgtDialog && !valgtDialog.lest) {
            fetch('/veilarbdialog/api/dialog/lest', {
                method: 'PUT',
                body: JSON.stringify({
                    lest: true,
                    dialogId: valgtDialog.id
                })
            }).then(() => dialoger.rerun());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valgtDialog]);

    if (dialogData.length === 0) {
        return (
            <div className="dialog dialog__tom">
                <Normaltekst className="infotekst">
                    Her kan du sende melding til veilederen din om arbeid og oppfølging.
                </Normaltekst>
                <Normaltekst className="infotekst">Du kan forvente svar i løpet av noen dager.</Normaltekst>
                <Normaltekst className="infotekst">Klikk på "Ny dialog"</Normaltekst>
                <IngenDialoger />
            </div>
        );
    } else {
        if (!valgtDialog) {
            return (
                <div className="dialog dialog__maavelges">
                    <IngenValgteDialoger />
                    <div className="infotekst">
                        <Normaltekst>Velg en dialog for å lese den</Normaltekst>
                    </div>
                </div>
            );
        }
        return (
            <>
                <div className="dialog">
                    <DialogHeader dialog={valgtDialog} />
                    <HenvendelseList henvendelseDataList={valgtDialog.henvendelser} />
                    <DialogInputBoxVisible
                        key={valgtDialog.id}
                        dialog={valgtDialog}
                        visible={oppfolgingData!.underOppfolging}
                    />
                </div>
                <Aktivitetskort dialog={valgtDialog} />
            </>
        );
    }
}

export default withRouter(Dialog);
