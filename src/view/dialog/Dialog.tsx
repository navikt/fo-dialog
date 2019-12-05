import React, { useEffect } from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { HenvendelseList } from '../henvendelse/HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import DialogInputBoxVisible from './DialogInputBox';
import useKansendeMelding from '../../utils/UseKanSendeMelding';

import './Dialog.less';
import { fetchData } from '../../utils/Fetch';

export function Dialog() {
    const kanSendeMelding = useKansendeMelding();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    useEffect(() => {
        if (valgtDialog && !valgtDialog.lest) {
            fetchData(`/veilarbdialog/api/dialog/${valgtDialog.id}/lest`, {
                method: 'PUT'
            }).then(() => dialoger.rerun());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valgtDialog]);

    if (!valgtDialog) return null;

    return (
        <div className="dialog">
            <DialogHeader dialog={valgtDialog} />
            <HenvendelseList dialogData={valgtDialog} />
            <DialogInputBoxVisible key={valgtDialog.id} dialog={valgtDialog} visible={kanSendeMelding} />
        </div>
    );
}

export default Dialog;
