import { logAmplitudeEvent } from '../metrics/amplitude-utils';
import { DialogData } from '../utils/Typer';

interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export default function loggEvent(eventNavn: string, feltObjekt?: object, tagObjekt?: object) {
    const event: FrontendEvent = { name: eventNavn, fields: feltObjekt, tags: tagObjekt };
    const url = process.env.REACT_APP_LOGGER_API_URL ?? '/veilarbdialog/api/logger/event';
    const config = {
        headers: {
            'Nav-Consumer-Id': 'aktivitetsplan',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin' as const,
        method: 'post',
        body: JSON.stringify(event)
    };
    const data = {
        ...feltObjekt,
        ...tagObjekt
    };
    logAmplitudeEvent(eventNavn, data);
    return fetch(url, config);
}

// TODO remove me in the future
export function loggChangeInDialog(gamelDialoger: DialogData[], nyeDialoger: DialogData[]) {
    if (gamelDialoger.length !== nyeDialoger.length) {
        loggEvent('arbeidsrettet-dialog.polling.ny-dialog');
        return;
    }

    const oldHenv = gamelDialoger.reduce((prevValue, currentValue) => prevValue + currentValue.henvendelser.length, 0);
    const newHenv = nyeDialoger.reduce((prevValue, currentValue) => prevValue + currentValue.henvendelser.length, 0);

    if (oldHenv !== newHenv) {
        loggEvent('arbeidsrettet-dialog.polling.ny-henvendelse');
    }
}
