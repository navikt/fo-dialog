import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { d } from 'msw/lib/glossary-de6278a9';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { UpdateTypes, dispatchUpdate } from '../../utils/UpdateEvent';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import { MeldingList } from '../melding/MeldingList';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined, useFnrContext, useViewContext } from '../Provider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { useEventListener } from '../utils/useEventListner';
import { endreDialogSomVises } from '../ViewState';
import ManagedDialogCheckboxes from './DialogCheckboxes';
import { dialogHeaderID1, dialogHeaderID2 } from './DialogHeader';
import DialogInputBoxVisible from './henvendelseInput/HenvendelseInputBox';
import HistoriskInfo from './HistoriskInfo';
import { IngenDialog } from './IngenDialog';

export function Dialog() {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    const kanSendeMelding = useKansendeMelding();
    const { lesDialog } = useDialogContext();

    const valgtDialog = useSelectedDialog();
    const dialogId = valgtDialog?.id;
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
            if (!dialogId) return;
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
        <section
            aria-labelledby={`${dialogHeaderID1} ${dialogHeaderID2}`}
            className={classNames('flex flex-col grow w-full lg:max-w-lgContainer xl:max-w-none')}
        >
            <Heading className="hidden" aria-labelledby={`${dialogHeaderID1} ${dialogHeaderID2}`}>
                Dialog Header
            </Heading>
            <MeldingList dialogData={valgtDialog} viewState={viewState} fnr={fnr} />
            <HistoriskInfo hidden={aktivDialog} kanSendeMelding={kanSendeMelding} />
            <section
                aria-label="Ny melding"
                className={classNames('border-t xl:flex xl:justify-center border-border-divider p-4 bg-white', {
                    'pt-2': !!bruker?.erVeileder
                })}
            >
                <div className="xl:max-w-248 xl:w-full">
                    <ManagedDialogCheckboxes dialog={valgtDialog} visible={!!bruker?.erVeileder} />
                    {!oppfolging?.underOppfolging || valgtDialog.historisk ? null : (
                        <DialogInputBoxVisible
                            key={valgtDialog.id}
                            dialog={valgtDialog}
                            kanSendeHenveldelse={kanSendeHenveldelse}
                            erBruker={!!bruker?.erBruker}
                        />
                    )}
                </div>
            </section>
        </section>
    );
}

export default Dialog;
