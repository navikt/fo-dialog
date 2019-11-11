import { Bruker, OppfolgingData, PeriodeData } from '../../utils/Typer';
import * as AppContext from '../Provider';
import { shallow } from 'enzyme';
import AlertStripeContainer from './AlertStripeContainer';
import React from 'react';
import '../../utils/SetupEnzyme';
import AldriUnderOppfolging from './AldriUnderOppfolging';
import IkkeUnderOppfolging from './IkkeUnderOppfolging';
import ReservertKrr from './ReservertKrr';
import KanIkkeVarsles from './KanIkkeVarsles';

const veileder: Bruker = { id: '010101', erVeileder: true, erBruker: false };
const bruker: Bruker = { id: '010101', erVeileder: false, erBruker: true };
const oppfPerioder: PeriodeData[] = [
    {
        aktorId: '1234567988888',
        veileder: false,
        startDato: '2017-01-30T10:46:10.971+01:00',
        sluttDato: '2017-12-31T10:46:10.971+01:00',
        begrunnelse: null
    }
];
const ingenPerioder: PeriodeData[] = [];
const oppfolgingData: OppfolgingData = {
    fnr: null,
    aktorId: null,
    veilederId: '101010',
    reservasjonKRR: true,
    kanVarsles: false,
    manuell: false,
    underOppfolging: false,
    underKvp: false,
    oppfolgingUtgang: null,
    gjeldendeEskaleringsvarsel: null,
    kanStarteOppfolging: false,
    avslutningStatus: null,
    oppfolgingsPerioder: ingenPerioder,
    harSkriveTilgang: true,
    kanReaktiveres: false,
    inaktiveringsdato: '2018-08-31T10:46:10.971+01:00',
    erSykmeldtMedArbeidsgiver: false,
    formidlingsgruppe: null,
    servicegruppe: null
};

describe('<AlertStripeContainer/>', () => {
    test('Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - veileder.', () => {
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<AldriUnderOppfolging erVeileder={true} />)).toBeTruthy();
    });
    test('Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - bruker. ', () => {
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<AldriUnderOppfolging erVeileder={false} />)).toBeTruthy();
    });
    test('Bruker med oppf.perioder og ikke under oppf. viser en advarsel - bruker. ', () => {
        oppfolgingData.oppfolgingsPerioder = oppfPerioder;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<IkkeUnderOppfolging erVeileder={false} />)).toBeTruthy();
    });
    test('Bruker med oppf.perioder, ikke under oppf. gir ingen feilmelding - veileder', () => {
        oppfolgingData.oppfolgingsPerioder = oppfPerioder;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<IkkeUnderOppfolging erVeileder={true} />)).toBeTruthy();
    });

    test('Bruker registret KRR viser en advarsel - veileder.', () => {
        oppfolgingData.underOppfolging = true;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<ReservertKrr erVeileder={true} />)).toBeTruthy();
    });
    test('Bruker registret KRR viser en advarsel - bruker. ', () => {
        oppfolgingData.underOppfolging = true;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<ReservertKrr erVeileder={false} />)).toBeTruthy();
    });
    test('Bruker kan ikke varsles viser en advarsel - bruker. ', () => {
        oppfolgingData.underOppfolging = true;
        oppfolgingData.reservasjonKRR = false;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<KanIkkeVarsles erVeileder={false} />)).toBeTruthy();
    });
    test('Bruker kan ikke varsles viser en advarsel - veileder', () => {
        oppfolgingData.underOppfolging = true;
        oppfolgingData.reservasjonKRR = false;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);

        const wrapper = shallow(<AlertStripeContainer />);
        expect(wrapper.matchesElement(<KanIkkeVarsles erVeileder={true} />)).toBeTruthy();
    });
});
