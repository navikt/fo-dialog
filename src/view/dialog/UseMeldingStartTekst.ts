import { useVeilederDataContext } from '../Provider';

const useMeldingStartTekst = () => {
    const veilederData = useVeilederDataContext();
    const { veilederNavn } = veilederData;

    if (!veilederNavn) {
        return '';
    }

    return '\n\nHilsen ' + veilederNavn;
};

export default useMeldingStartTekst;
