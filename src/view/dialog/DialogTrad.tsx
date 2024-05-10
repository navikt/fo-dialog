import { Loader } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRoutes } from '../../routing/routes';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import { useVisAktivitet } from '../AktivitetToggleContext';
import { useDialogContext } from '../DialogProvider';
import { Meldinger } from '../melding/Meldinger';
import { useFnrContext } from '../Provider';
import { useSelectedAktivitet, useSelectedDialog } from '../utils/useAktivitetId';
import { useEventListener } from '../utils/useEventListner';
import { HandlingsType, useSetViewContext, useViewContext } from '../ViewState';
import MeldingInputBox from './meldingInput/MeldingInputBox';
import HistoriskInfo from './HistoriskInfo';
import { useHentDialogStatus } from '../dialogProvider/dialogStore';
import { Status } from '../../api/typer';

export const DialogTrad = () => {
    const scrollContainerRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const aktivitet = useSelectedAktivitet();
    const { lesDialog } = useDialogContext();

    const valgtDialog = useSelectedDialog();
    const lasterDialoger = [Status.PENDING, Status.RELOADING].includes(useHentDialogStatus());
    const dialogId = valgtDialog?.id;
    const fnr = useFnrContext();
    const visAktivitet = useVisAktivitet();

    const viewState = useViewContext();
    const setViewState = useSetViewContext();
    const [activeTab, setActiveTab] = useState(!document.hidden);
    const [activePersonflateTab, setActivePersonflateTab] = useState(true);

    const lest = !valgtDialog ? true : valgtDialog.lest;
    const { state: navigationState } = useLocation();

    useEffect(() => {
        // Hvis det navigeres til denne siden med en state (som arg i navigate) så puttes den i context
        // Hvis ikke skal sistHandlingsType være INGEN (Ikke vis send bekreftelse)
        if (!navigationState?.sistHandlingsType) {
            setViewState({ sistHandlingsType: HandlingsType.ingen });
        } else if (navigationState.sistHandlingsType !== viewState.sistHandlingsType) {
            setViewState({ sistHandlingsType: navigationState.sistHandlingsType });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogId, setViewState, navigationState]);

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
            lesDialog(dialogId, fnr).then(() => {
                dispatchUpdate(UpdateTypes.Dialog);
                window.dispatchEvent(new Event('aktivitetsplan.dialog.lest')); //lest teller i personflata
            });
        }
    }, [dialogId, lest, activeTab, activePersonflateTab, fnr]);

    const routes = useRoutes();
    const navigate = useNavigate();

    useEffect(() => {
        scrollContainerRef?.current?.scrollTo({
            top: scrollContainerRef?.current?.scrollHeight
        });
    }, [scrollContainerRef, valgtDialog]);

    if (!valgtDialog && lasterDialoger) {
        return <DialogLoader />;
    }
    if (!valgtDialog) {
        navigate(routes.baseRoute(), { replace: true });
        return <DialogLoader />;
    }

    const aktivDialog = !valgtDialog.historisk;

    return (
        <section
            className={classNames('flex w-full grow xl:max-w-none', {
                'flex-col lg:flex-row 2xl:flex-row': aktivitet && !visAktivitet,
                'flex-col 2xl:flex-row': aktivitet && visAktivitet,
                'flex-col lg:flex-row': !aktivitet
            })}
        >
            <div ref={scrollContainerRef} className="relative flex flex-1 grow flex-col overflow-y-scroll">
                <Meldinger dialogData={valgtDialog} />
                <HistoriskInfo hidden={aktivDialog} />
            </div>
            <MeldingInputBox dialog={valgtDialog} />
        </section>
    );
};

const DialogLoader = () => (
    <div className="flex w-full bg-gray-100 items-center justify-center">
        <Loader size="2xlarge" />
    </div>
);
