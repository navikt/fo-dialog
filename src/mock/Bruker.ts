import { erEksternBruker } from './demo/localstorage';

export const eksternbruker = {
    id: '1234567890',
    erVeileder: false,
    erBruker: true
};

export const veileder = {
    id: 'Z123456',
    erVeileder: true,
    erBruker: false
};

const erEksternbruker = erEksternBruker();

const bruker = () => {
    if (erEksternbruker) return eksternbruker;
    else return veileder;
};

export default bruker;
