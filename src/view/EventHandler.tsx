import React from 'react';
import { useEventListener } from './utils/useEventListner';
import { useHistory } from 'react-router';

interface EventDetails {
    dialogId?: string;
    aktivitetId?: string;
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

    return <></>;
}
