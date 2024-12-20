import { DialogApi } from '../api/UseApiBasePath';
import { logAmplitudeEvent } from '../metrics/amplitude-utils';
import { DialogData } from '../utils/Typer';

interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}
const url = DialogApi.logg;
export default function loggEvent(eventNavn: string, feltObjekt?: object, tagObjekt?: object) {
    const event: FrontendEvent = { name: eventNavn, fields: feltObjekt, tags: tagObjekt };
    const config = {
        headers: {
            'Nav-Consumer-Id': 'arbeidsrettet-dialog',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin' as const,
        method: 'post',
        body: JSON.stringify(event)
    };
    logAmplitudeEvent(eventNavn, { ...feltObjekt, ...tagObjekt });
    fetch(url, config).catch((e) => {
        console.warn('Klarte ikke logge event', e);
    });
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
