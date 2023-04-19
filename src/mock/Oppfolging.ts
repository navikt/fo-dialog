import { PeriodeData } from '../utils/Typer';
import {
    brukerKanIkkeVarsles,
    erKRRBruker,
    erManuellBruker,
    erPrivatBruker,
    ingenOppfPerioder
} from './demo/sessionstorage';

const oppfPerioder: PeriodeData[] = [
    {
        aktorId: '1234567988888',
        veileder: false,
        startDato: '2017-01-30T10:46:10.971+01:00',
        sluttDato: '2017-12-31T10:46:10.971+01:00',
        begrunnelse: null,
        kvpPerioder: []
    },
    {
        aktorId: '1234567988888',
        veileder: false,
        startDato: '2018-01-31T10:46:10.971+01:00',
        sluttDato: null,
        begrunnelse: null,
        kvpPerioder: []
    }
];
const oppfolgingData = {
    fnr: null,
    veilederId: '101010',
    reservasjonKRR: erKRRBruker(),
    manuell: erManuellBruker(),
    underOppfolging: !erPrivatBruker(),
    underKvp: false,
    oppfolgingUtgang: null,
    gjeldendeEskaleringsvarsel: null,
    kanStarteOppfolging: false,
    avslutningStatus: null,
    oppfolgingsPerioder: ingenOppfPerioder() ? [] : oppfPerioder,
    harSkriveTilgang: true,
    kanReaktiveres: false,
    kanVarsles: !brukerKanIkkeVarsles(),
    inaktiveringsdato: '2018-08-31T10:46:10.971+01:00'
};

export default oppfolgingData;
