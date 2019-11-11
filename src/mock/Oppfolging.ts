import { PeriodeData } from '../utils/Typer';
import { JSONArray } from 'yet-another-fetch-mock';

const oppfPerioder: PeriodeData[] & JSONArray = [
    {
        aktorId: '1234567988888',
        veileder: false,
        startDato: '2017-01-30T10:46:10.971+01:00',
        sluttDato: '2017-12-31T10:46:10.971+01:00',
        begrunnelse: null
    },
    {
        aktorId: '1234567988888',
        veileder: false,
        startDato: '2018-01-31T10:46:10.971+01:00',
        sluttDato: null,
        begrunnelse: null
    }
];
const oppfolgingData = {
    aktorId: null,
    erSykmeldtMedArbeidsgiver: false,
    formidlingsgruppe: null,
    servicegruppe: null,
    fnr: null,
    veilederId: '101010',
    reservasjonKRR: true,
    manuell: false,
    underOppfolging: true, //eller false
    underKvp: false,
    oppfolgingUtgang: null,
    gjeldendeEskaleringsvarsel: null,
    kanStarteOppfolging: false,
    avslutningStatus: null,
    oppfolgingsPerioder: oppfPerioder,
    harSkriveTilgang: true,
    kanReaktiveres: false,
    kanVarsles: true,
    inaktiveringsdato: '2018-08-31T10:46:10.971+01:00'
};

export default oppfolgingData;
