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
import { endreDialogSomVises } from '../ViewState';
import DialogSendtBekreftelse from './DialogSendtBekreftelse';
import HistoriskInfo from './HistoriskInfo';
import { IngenDialog } from './IngenDialog';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import useApiBasePath from '../../utils/UseApiBasePath';

export function Dialog() {
    const kanSendeMelding = useKansendeMelding();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);
    const fnr = useFnrContext();
    const query = fnrQuery(fnr);
    const apiBasePath = useApiBasePath();

    const { viewState, setViewState } = useViewContext();

    useEffect(() => {
        setViewState(endreDialogSomVises(viewState, dialogId));
        if (valgtDialog && !valgtDialog.lest) {
            fetchData(`${apiBasePath}/veilarbdialog/api/dialog/${valgtDialog.id}/les${query}`, {
                method: 'PUT'
            })
                .then(() => dialoger.rerun())
                .then(() => dispatchUpdate(UpdateTypes.Dialog));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogId, apiBasePath]);

    if (!valgtDialog) {
        return <IngenDialog />;
    }

    const aktivDialog = !valgtDialog.historisk;
    const kanSendeHenveldelse = kanSendeMelding && aktivDialog;

    return (
        <div className="dialog">
            <DialogHeader dialog={valgtDialog} />
            <HenvendelseList dialogData={valgtDialog} />
            <DialogSendtBekreftelse viewState={viewState} dialog={valgtDialog} fnr={fnr} />
            <HistoriskInfo hidden={aktivDialog} kanSendeMelding={kanSendeMelding} />
            <DialogInputBoxVisible key={valgtDialog.id} dialog={valgtDialog} visible={kanSendeHenveldelse} />
        </div>
    );
}

export default Dialog;
