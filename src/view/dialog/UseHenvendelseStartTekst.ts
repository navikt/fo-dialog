import { useVeilederDataContext } from '../Provider';

const UseHenvendelseStartTekst = () => {
    const veilederData = useVeilederDataContext();
    const { veilederNavn } = veilederData;

    if (!veilederNavn) {
        return '';
    }

    const navn = '\nHilsen ' + veilederNavn;
    return navn;
};

export default UseHenvendelseStartTekst;
