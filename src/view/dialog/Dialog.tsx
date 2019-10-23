import React, { useEffect } from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { HenvendelseList } from '../henvendelse/HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { useDialogContext, useOppfolgingContext } from '../Provider';
import { RouteComponentProps, withRouter } from 'react-router';
import { Normaltekst } from 'nav-frontend-typografi';
import DialogInputBoxVisible from './DialogInputBox';
import InfoVedIngenDialogerVisible from '../InfoVedIngenDialoger';
import { ReactComponent as IngenValgteDialoger } from './ingen-valgt.svg';

import './Dialog.less';

interface Props extends RouteComponentProps<{ dialogId?: string }> {}

//TODO: Splitte komponent i to eller tre
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
            <>
                <div className="dialog dialog__tom">
                    <InfoVedIngenDialogerVisible visible={true} />
                </div>
            </>
        );
    } else {
        if (!valgtDialog) {
            return (
                <>
                    <div className="dialog dialog__maavelges">
                        <IngenValgteDialoger />
                        <div className="infotekst">
                            <Normaltekst>Velg en dialog for å lese den</Normaltekst>
                        </div>
                    </div>
                </>
            );
        }
        return (
            <>
                <div className="dialog">
                    <DialogHeader dialog={valgtDialog} />
                    <HenvendelseList dialogData={valgtDialog} />
                    <DialogInputBoxVisible
                        key={valgtDialog.id}
                        dialog={valgtDialog}
                        visible={oppfolgingData!.underOppfolging}
                    />
                </div>
            </>
        );
    }
}

export default withRouter(Dialog);
