export const SessionStorageElement = {
    BRUKER_TYPE: 'brukertype',
    PRIVAT_BRUKER: 'privatbruker',
    MANUELL_BRUKER: 'manuellbruker',
    KRR_BRUKER: 'krrbruker',
    INGEN_OPPF_PERIODER: 'ingen_oppf_perioder',
    KAN_IKKE_VARSLES: 'bruker_kan_ikke_varsles',
    INGEN_DIALOGER: 'ingen_dialoger',
    HODEFOT: 'hodefot',
    FAILURE_RATE: 'failure_rate',
    DIALOG_FEILER: 'dialog_feiler',
    AKTIVITET_FEILER: 'aktivitet_feiler',
    ARENAAKTIVITET_FEILER: 'arenaaktivitet_feiler',
    NY_DIALOG_SEND_MELDING_FEILER: 'ny_dialog_eller_send_melding_feiler'
};

export const BRUKER_TYPE = {
    INTERN: 'intern',
    EKSTERN: 'ekstern'
};

export const settSessionStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, value);
};

export const hentFraSessionStorage = (key: string) => {
    return window.localStorage.getItem(key);
};

const erSatt = (sessionStorageElement: string) => {
    return hentFraSessionStorage(sessionStorageElement) === 'true';
};

export const erPrivatBruker = () => erSatt(SessionStorageElement.PRIVAT_BRUKER);

export const erManuellBruker = () => erSatt(SessionStorageElement.MANUELL_BRUKER);

export const erKRRBruker = () => erSatt(SessionStorageElement.KRR_BRUKER);

export const ingenOppfPerioder = () => erSatt(SessionStorageElement.INGEN_OPPF_PERIODER);

export const brukerKanIkkeVarsles = () => erSatt(SessionStorageElement.KAN_IKKE_VARSLES);

export const erEksternBruker = () => hentFraSessionStorage(SessionStorageElement.BRUKER_TYPE) === BRUKER_TYPE.EKSTERN;

export const harIngenDialoger = () => erSatt(SessionStorageElement.INGEN_DIALOGER);

export const harHodeFotSkruddPa = () => erSatt(SessionStorageElement.HODEFOT);

export const harDialogFeilerSkruddPa = () => erSatt(SessionStorageElement.DIALOG_FEILER);

export const harAktivitetFeilerSkruddPa = () => erSatt(SessionStorageElement.AKTIVITET_FEILER);

export const harArenaaktivitetFeilerSkruddPa = () => erSatt(SessionStorageElement.ARENAAKTIVITET_FEILER);

export const harNyDialogEllerSendMeldingFeilerSkruddPa = () =>
    erSatt(SessionStorageElement.NY_DIALOG_SEND_MELDING_FEILER);

export function getFailureRate(): number {
    const value = hentFraSessionStorage(SessionStorageElement.FAILURE_RATE);
    return value ? Number.parseInt(value) : 0;
}
