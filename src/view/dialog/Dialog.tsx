import React, { useEffect } from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { HenvendelseList } from '../henvendelse/HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { useDialogContext, useViewContext } from '../Provider';
import { useParams } from 'react-router';
import DialogInputBoxVisible from './DialogInputBox';
import useKansendeMelding from '../../utils/UseKanSendeMelding';

import './Dialog.less';
import { ViewAction } from '../ViewState';

export function Dialog() {
    const kanSendeMelding = useKansendeMelding();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    const { state, dispatch } = useViewContext();

    useEffect(() => {
        dispatch({ type: ViewAction.changeDialogInView, payload: dialogId });
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
    }, [dialogId]);

    if (!valgtDialog) return null;

    return (
        <div className="dialog">
            <DialogHeader dialog={valgtDialog} />
            <HenvendelseList dialogData={valgtDialog} />
            {state.newHendvendelse ? 'works like a charm' : null}
            {state.newDialog ? 'works like a charm2' : null}
            <DialogInputBoxVisible key={valgtDialog.id} dialog={valgtDialog} visible={kanSendeMelding} />
        </div>
    );
}

export default Dialog;
