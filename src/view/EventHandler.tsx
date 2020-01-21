import React from 'react';
import { useEventListener } from './utils/useEventListner';
import { useHistory } from 'react-router';

interface EventDetails {
    dialogId?: string;
    aktivitetId?: string;
}

interface Props {
    basePath?: string;
}

export function EventHandler(props: Props) {
    const { basePath } = props;
    const history = useHistory();
    useEventListener<EventDetails>('visDialog', event => {
        const { dialogId, aktivitetId } = event.detail;
        if (!!dialogId) {
            history.push(basePath + `/${dialogId}`);
        } else if (!!aktivitetId) {
            history.push(basePath + `/ny?aktivitetId=${aktivitetId}`);
        }
    });

    return <></>;
}
