import React, { useEffect } from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { HenvendelseList } from '../henvendelse/HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { useDialogContext, useFnrContext, useViewContext } from '../Provider';
import { useParams } from 'react-router';
import DialogInputBoxVisible from './DialogInputBox';
import useKansendeMelding from '../../utils/UseKanSendeMelding';

import './Dialog.less';
import { fetchData, fnrQuery } from '../../utils/Fetch';
import { ViewAction } from '../ViewState';
import DialogSendtBekreftelse from './DialogSendtBekreftelse';

export function Dialog() {
    const kanSendeMelding = useKansendeMelding();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);
    const fnr = useFnrContext();
    const query = fnrQuery(fnr);

    const { state, dispatch } = useViewContext();

    useEffect(() => {
        dispatch({ type: ViewAction.changeDialogInView, payload: dialogId });
        if (valgtDialog && !valgtDialog.lest) {
            fetchData(`/veilarbdialog/api/dialog/${valgtDialog.id}/les${query}`, {
                method: 'PUT'
            }).then(() => dialoger.rerun());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogId]);

    if (!valgtDialog) return null;

    return (
        <div className="dialog">
            <DialogHeader dialog={valgtDialog} />
            <HenvendelseList dialogData={valgtDialog} />
            <DialogSendtBekreftelse viewState={state} dialog={valgtDialog} />
            <DialogInputBoxVisible key={valgtDialog.id} dialog={valgtDialog} visible={kanSendeMelding} />
        </div>
    );
}

export default Dialog;
