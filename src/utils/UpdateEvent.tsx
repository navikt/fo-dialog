import React from 'react';

import { useAktivitetContext } from '../view/AktivitetProvider';
import { useDialogContext } from '../view/DialogProvider';
import { useOppfolgingContext } from '../view/OppfolgingProvider';
import { useEventListener } from '../view/utils/useEventListner';

export enum UpdateTypes {
    Dialog = 'DIALOG',
    Oppfolging = 'OPPFOLGING',
    Aktivitet = 'AKTIVITET'
}

interface UpdateEventType {
    update: string;
    avsender?: string;
}

const eventName = 'uppdate';

export function dispatchUpdate(update: UpdateTypes) {
    window.dispatchEvent(
        new CustomEvent<UpdateEventType>(eventName, { detail: { update: update, avsender: 'dialog' } })
    );
}

function isUpdateEvent(toBeDetermined: CustomEvent): toBeDetermined is CustomEvent<UpdateEventType> {
    return !!(toBeDetermined as CustomEvent<UpdateEventType>).type;
}

export function UppdateEventHandler() {
    const aktivitetContext = useAktivitetContext();
    const dialogContext = useDialogContext();
    const oppfolgingContext = useOppfolgingContext();
    useEventListener(eventName, (event) => {
        if (!isUpdateEvent(event)) {
            return;
        }

        const updateType = event.detail.update;
        const avsennder = event.detail.avsender;

        if (avsennder === 'dialog') {
            return;
        }

        switch (updateType) {
            case UpdateTypes.Aktivitet:
                return aktivitetContext.hentAktiviteter();
            case UpdateTypes.Dialog:
                return dialogContext.hentDialoger();
            case UpdateTypes.Oppfolging:
                return oppfolgingContext.hentOppfolging();
        }
    });

    return <></>;
}
