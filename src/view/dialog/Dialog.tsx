import { Loader } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useRoutes } from '../../routes';
import { UpdateTypes, dispatchUpdate } from '../../utils/UpdateEvent';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import { useVisAktivitet } from '../AktivitetToggleContext';
import { useUserInfoContext } from '../BrukerProvider';
import { useDialogContext } from '../DialogProvider';
import { useCompactMode } from '../../featureToggle/FeatureToggleProvider';
import { Meldinger } from '../melding/Meldinger';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined, useFnrContext, useViewContext } from '../Provider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { useEventListener } from '../utils/useEventListner';
import { endreDialogSomVises } from '../ViewState';
import ManagedDialogCheckboxes from './DialogCheckboxes';
import DialogInputBoxVisible from './henvendelseInput/MeldingInputBox';
import HistoriskInfo from './HistoriskInfo';

export function Dialog() {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolging = dataOrUndefined(oppfolgingContext);
    const compactMode = useCompactMode();
    const kanSendeMelding = useKansendeMelding();
    const { lesDialog } = useDialogContext();

    const valgtDialog = useSelectedDialog();
    const dialogId = valgtDialog?.id;
    const fnr = useFnrContext();
    const bruker = useUserInfoContext();
    const visAktivitet = useVisAktivitet();

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

    const routes = useRoutes();
    const navigate = useNavigate();

    useEffect(() => {
        if (!valgtDialog) {
            navigate(routes.baseRoute(), { replace: true });
        }
    }, [navigate, routes, valgtDialog]);

    if (!valgtDialog) {
        return <Loader />;
    }

    const aktivDialog = !valgtDialog.historisk;
    const kanSendeHenveldelse = kanSendeMelding && aktivDialog;

    return (
        <section
            className={classNames('flex w-full grow xl:max-w-none', {
                'flex-col lg:flex-row 2xl:flex-row': compactMode && !visAktivitet,
                'flex-col': !compactMode || visAktivitet,
                'lg:max-w-lgContainer xl:max-w-none': !compactMode,
                '2xl:flex-row': compactMode && visAktivitet
            })}
        >
            <div className="relative flex flex-1 grow flex-col overflow-y-scroll">
                <Meldinger dialogData={valgtDialog} viewState={viewState} fnr={fnr} />
                <HistoriskInfo hidden={aktivDialog} kanSendeMelding={kanSendeMelding} />
            </div>
            <section
                aria-label="Ny melding"
                className={classNames('flex border-t border-border-divider bg-white p-4 xl:justify-center', {
                    'lg:flex-1 lg:grow': compactMode && !visAktivitet
                })}
            >
                <div
                    className={classNames('w-full', {
                        'flex flex-col ': compactMode && !visAktivitet,
                        'xl:max-w-248': !compactMode
                    })}
                >
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
