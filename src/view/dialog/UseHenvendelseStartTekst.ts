import { useVeilederDataContext } from '../Provider';

const useHenvendelseStartTekst = () => {
    const veilederData = useVeilederDataContext();
    const { veilederNavn } = veilederData;

    if (!veilederNavn) {
        return '';
    }

    return '\n\nHilsen ' + veilederNavn;
};

export default useHenvendelseStartTekst;
