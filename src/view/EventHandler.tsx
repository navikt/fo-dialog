import React, { useLayoutEffect } from 'react';
import { useEventListener } from './utils/useEventListner';
import { useHistory } from 'react-router';
import loggEvent from '../felleskomponenter/logging';

interface EventDetails {
    dialogId?: string;
    aktivitetId?: string;
}

function listener(e: KeyboardEvent) {
    if (!(e.key === 'Enter' && (e.metaKey || e.ctrlKey))) return;

    const target: (EventTarget & HTMLTextAreaElement) | null = e.target as (EventTarget & HTMLTextAreaElement) | null;
    if (target && target.form) {
        target.form.dispatchEvent(new Event('submit'));
    }
}

const LOGGING_ANTALLBRUKERE_DIALOG = 'arbeidsrettet-dialog.antallBrukere';

function loggingAntallBrukere() {
    loggEvent(LOGGING_ANTALLBRUKERE_DIALOG);
}

export function EventHandler() {
    const history = useHistory();
    useEventListener<EventDetails>('visDialog', event => {
        const { dialogId, aktivitetId } = event.detail;
        if (!!dialogId) {
            history.push(`/${dialogId}`);
        } else if (!!aktivitetId) {
            history.push(`/ny?aktivitetId=${aktivitetId}`);
        }
    });

    useLayoutEffect(() => {
        loggingAntallBrukere();
        document.body.addEventListener('keydown', listener);
        return () => document.body.removeEventListener('keydown', listener);
    }, []);

    return <></>;
}
