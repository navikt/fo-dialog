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
