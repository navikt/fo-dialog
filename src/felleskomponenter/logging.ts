import { DialogData } from '../utils/Typer';

interface Frontendlogger {
    event: (name: string, fields: object, tags: object) => void;
}

export default function loggEvent(eventNavn: string, feltObjekt?: object, tagObjekt?: object) {
    const frontendlogger: Frontendlogger = (window as any).frontendlogger;
    if (frontendlogger && frontendlogger.event) {
        frontendlogger.event(eventNavn, feltObjekt || {}, tagObjekt || {});
    } else {
        // eslint-disable-next-line
        console.log(eventNavn, { feltObjekt, tagObjekt });
    }
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
