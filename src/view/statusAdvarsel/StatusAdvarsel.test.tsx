import { Bruker, OppfolgingData, PeriodeData } from '../../utils/Typer';
import * as AppContext from '../Provider';
import { shallow } from 'enzyme';
import StatusAdvarsel from './StatusAdvarsel';
import React from 'react';
import '../../utils/SetupEnzyme';
import AldriUnderOppfolging from './AldriUnderOppfolging';
import IkkeUnderOppfolging from './IkkeUnderOppfolging';
import ReservertKrr from './ReservertKrr';
import KanIkkeVarsles from './KanIkkeVarsles';
import { FetchResult, Status } from '@nutgaard/use-fetch';
import { HarNivaa4Response } from '../../api/useFetchHarNivaa4';
import { ManglerNivaa4, Nivaa4Feiler } from './Nivaa4';

const veileder: Bruker = { id: '010101', erVeileder: true, erBruker: false };
const bruker: Bruker = { id: '010101', erVeileder: false, erBruker: true };
const oppfPerioder: PeriodeData[] = [
    {
        aktorId: '1234567988888',
        veileder: false,
        startDato: '2017-01-30T10:46:10.971+01:00',
        sluttDato: '2017-12-31T10:46:10.971+01:00',
        begrunnelse: null,
        kvpPerioder: []
    }
];
const ingenPerioder: PeriodeData[] = [];
const oppfolgingData: OppfolgingData = {
    fnr: 'null',
    aktorId: 'null',
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
const useFetchOppfolging: FetchResult<OppfolgingData> = {
    status: Status.OK,
    statusCode: 0,
    data: oppfolgingData,
    rerun(): void {}
};

const useNivaa4: HarNivaa4Response = {
    harNivaa4: true,
    hasError: false,
    isPending: false
};

describe('<AlertStripeContainer/>', () => {
    test('Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - veileder.', () => {
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<AldriUnderOppfolging erVeileder={true} />)).toBeTruthy();
    });
    test('Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - bruker. ', () => {
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<AldriUnderOppfolging erVeileder={false} />)).toBeTruthy();
    });
    test('Bruker med oppf.perioder og ikke under oppf. viser en advarsel - bruker. ', () => {
        useFetchOppfolging.data.oppfolgingsPerioder = oppfPerioder;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<IkkeUnderOppfolging erVeileder={false} />)).toBeTruthy();
    });
    test('Bruker med oppf.perioder, ikke under oppf. gir ingen feilmelding - veileder', () => {
        useFetchOppfolging.data.oppfolgingsPerioder = oppfPerioder;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<IkkeUnderOppfolging erVeileder={true} />)).toBeTruthy();
    });

    test('Bruker registret KRR viser en advarsel - veileder.', () => {
        useFetchOppfolging.data.underOppfolging = true;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<ReservertKrr erVeileder={true} />)).toBeTruthy();
    });
    test('Bruker registret KRR viser en advarsel - bruker. ', () => {
        useFetchOppfolging.data.underOppfolging = true;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<ReservertKrr erVeileder={false} />)).toBeTruthy();
    });
    // test('Bruker kan ikke varsles viser en advarsel - bruker. ', () => {
    //     useFetchOppfolging.data.underOppfolging = true;
    //     useFetchOppfolging.data.reservasjonKRR = false;
    //
    //     jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
    //     jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
    //
    //     const wrapper = shallow(<AlertStripeContainer />);
    //     expect(wrapper.matchesElement(<KanIkkeVarsles erVeileder={false} />)).toBeTruthy();
    // });
    // test('Bruker kan ikke varsles viser en advarsel - veileder', () => {
    //     useFetchOppfolging.data.underOppfolging = true;
    //     useFetchOppfolging.data.reservasjonKRR = false;
    //
    //     jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
    //     jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
    //
    //     const wrapper = shallow(<AlertStripeContainer />);
    //     expect(wrapper.matchesElement(<KanIkkeVarsles erVeileder={true} />)).toBeTruthy();
    // });

    test('ManglerNivaa4 - veileder', () => {
        useFetchOppfolging.data.underOppfolging = true;
        useFetchOppfolging.data.reservasjonKRR = false;
        useFetchOppfolging.data.kanVarsles = true;

        useNivaa4.harNivaa4 = false;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<ManglerNivaa4 erVeileder={true} />)).toBeTruthy();
    });

    test('Nivaa4Feiler - veileder', () => {
        useFetchOppfolging.data.underOppfolging = true;
        useFetchOppfolging.data.reservasjonKRR = false;
        useFetchOppfolging.data.kanVarsles = true;

        useNivaa4.harNivaa4 = false;
        useNivaa4.hasError = true;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.matchesElement(<Nivaa4Feiler erVeileder={true} />)).toBeTruthy();
    });

    test('ingen varsler for gyldig status - veileder', () => {
        useFetchOppfolging.data.underOppfolging = true;
        useFetchOppfolging.data.reservasjonKRR = false;
        useFetchOppfolging.data.kanVarsles = true;

        useNivaa4.harNivaa4 = true;
        useNivaa4.hasError = false;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.isEmptyRender()).toBeTruthy();
    });

    test('ingen varsler for gyldig status - bruker. ', () => {
        useFetchOppfolging.data.underOppfolging = true;
        useFetchOppfolging.data.reservasjonKRR = false;
        useFetchOppfolging.data.kanVarsles = true;

        useNivaa4.harNivaa4 = true;
        useNivaa4.hasError = false;

        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = shallow(<StatusAdvarsel />);
        expect(wrapper.isEmptyRender()).toBeTruthy();
    });
});
