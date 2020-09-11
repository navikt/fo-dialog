import React, { useEffect, useState } from 'react';
import { HenvendelseList } from '../henvendelse/HenvendelseList';
import { DialogHeader, dialogHeaderID1, dialogHeaderID2 } from './DialogHeader';
import { useFnrContext, useUserInfoContext, useViewContext } from '../Provider';
import { useParams } from 'react-router';
import DialogInputBoxVisible from './DialogInputBox';
import useKansendeMelding from '../../utils/UseKanSendeMelding';

import './Dialog.less';
import { endreDialogSomVises } from '../ViewState';
import DialogSendtBekreftelse from './DialogSendtBekreftelse';
import HistoriskInfo from './HistoriskInfo';
import { IngenDialog } from './IngenDialog';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import styles from './Dialog.module.less';
import { useDialogContext } from '../DialogProvider';
import { Systemtittel } from 'nav-frontend-typografi';
import ManagedDialogCheckboxes from './DialogCheckboxes';
import { useEventListener } from '../utils/useEventListner';

export function Dialog() {
    const kanSendeMelding = useKansendeMelding();
    const { lesDialog, dialoger } = useDialogContext();
    const { dialogId } = useParams();
    const valgtDialog = dialoger.find((dialog) => dialog.id === dialogId);
    const fnr = useFnrContext();
    const bruker = useUserInfoContext();

    const { viewState, setViewState } = useViewContext();
    const [activeTab, setActiveTab] = useState(!document.hidden);
    const [activePersonflateTab, setActivePersonflateTab] = useState(true);

    const lest = !valgtDialog ? true : valgtDialog.lest;

    useEffect(() => {
        setViewState(endreDialogSomVises(viewState, dialogId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogId]);

    useEffect(() => {
        const listener = () => setActiveTab(!document.hidden);
        document.addEventListener('visibilitychange', listener, false);
        return () => document.removeEventListener('visibilitychange', listener);
    }, [setActiveTab]);

    useEventListener<{ tabId: string; dialogId?: string }>('veilarbpersonflatefs.tab-clicked', (event) => {
        const correctDialogInView = !event.detail.dialogId ? true : dialogId === event.detail.dialogId;
        if (event.detail.tabId === 'DIALOG' && correctDialogInView) {
            setActivePersonflateTab(true);
        } else {
            setActivePersonflateTab(false);
        }
    });

    useEffect(() => {
        if (!lest && activeTab && activePersonflateTab) {
            lesDialog(dialogId).then(() => {
                dispatchUpdate(UpdateTypes.Dialog);
                window.dispatchEvent(new Event('aktivitetsplan.dialog.lest')); //lest teller i personflata
            });
        }
    }, [dialogId, lest, activeTab, activePersonflateTab, lesDialog]);

    if (!valgtDialog) {
        return <IngenDialog />;
    }

    const aktivDialog = !valgtDialog.historisk;
    const kanSendeHenveldelse = kanSendeMelding && aktivDialog;

    return (
        <section aria-labelledby={`${dialogHeaderID1} ${dialogHeaderID2}`} className={styles.dialog}>
            <Systemtittel className="visually-hidden" aria-labelledby={`${dialogHeaderID1} ${dialogHeaderID2}`}>
                Dialog Header
            </Systemtittel>
            <DialogHeader dialog={valgtDialog} visSkygge={!!bruker?.erBruker} />
            <ManagedDialogCheckboxes dialog={valgtDialog} visible={!!bruker?.erVeileder} />
            <HenvendelseList dialogData={valgtDialog} />
            <DialogSendtBekreftelse viewState={viewState} dialog={valgtDialog} fnr={fnr} />
            <HistoriskInfo hidden={aktivDialog} kanSendeMelding={kanSendeMelding} />
            <DialogInputBoxVisible
                key={valgtDialog.id}
                dialog={valgtDialog}
                kanSendeHenveldelse={kanSendeHenveldelse}
            />
        </section>
    );
}

export default Dialog;
