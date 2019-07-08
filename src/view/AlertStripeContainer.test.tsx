import React from "react";
import {shallow} from 'enzyme';
import {AlertStripeContainer} from "./AlertStripeContainer";
import * as AppContext from '../Context';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Bruker, PeriodeData} from "../utils/typer";
import {useUserInfoContext} from "../Context";

Enzyme.configure({ adapter: new Adapter() });
const userInfo: Bruker = {id:"010101", erVeileder: true,erBruker:false};
const oppfPerioder: PeriodeData[] = [];
const oppfolgingData = {
    fnr: null,
    veilederId: "101010",
    reservasjonKRR: false,
    manuell: false,
    underOppfolging: false, //eller false
    underKvp: false,
    oppfolgingUtgang: null,
    gjeldendeEskaleringsvarsel: null,
    kanStarteOppfolging: false,
    avslutningStatus: null,
    oppfolgingsPerioder: oppfPerioder,
    harSkriveTilgang: true,
    kanReaktiveres: false,
    inaktiveringsdato: '2018-08-31T10:46:10.971+01:00',
};

describe('<AlertStripeContainer/>', () => {

    test("Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - veileder.", () => {
        userInfo.erVeileder=true;
        oppfolgingData.underOppfolging = false;
        oppfolgingData.oppfolgingsPerioder = [];
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => userInfo);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);
        const wrapper = shallow(<AlertStripeContainer/>);
        expect(wrapper.prop("data-ikke-reg-veileder")).toBeTruthy()
    });
    test("Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - bruker. ", () => {
        userInfo.erVeileder = false;
        oppfolgingData.underOppfolging = false;
        oppfolgingData.oppfolgingsPerioder = [];
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => userInfo);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);
        const wrapper = shallow(<AlertStripeContainer/>);
        expect(wrapper.prop("data-ikke-reg-bruker")).toBeTruthy()
    });
    test("Bruker med oppf.perioder og ikke under oppf. viser en advarsel - bruker. ", () => {
        userInfo.erVeileder = false;
        oppfolgingData.underOppfolging = false;
        oppfolgingData.oppfolgingsPerioder = [{
            aktorId: '1234567988888',
            veileder: false,
            startDato: '2017-01-30T10:46:10.971+01:00',
            sluttDato: '2017-12-31T10:46:10.971+01:00',
            begrunnelse: null,
        },
            {
                aktorId: '1234567988888',
                veileder: false,
                startDato: '2018-01-31T10:46:10.971+01:00',
                sluttDato: null,
                begrunnelse: null,
            },];
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => userInfo);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);
        const wrapper = shallow(<AlertStripeContainer/>);
        expect(wrapper.prop("data-har-oppfP-bruker")).toBeTruthy()
    });
    test("Bruker med oppf.perioder, ikke under oppf. gir ingen feilmelding - veileder", () => {
        userInfo.erVeileder = true;
        oppfolgingData.underOppfolging = false;
        oppfolgingData.oppfolgingsPerioder = [{
            aktorId: '1234567988888',
            veileder: false,
            startDato: '2017-01-30T10:46:10.971+01:00',
            sluttDato: '2017-12-31T10:46:10.971+01:00',
            begrunnelse: null,
        },
            {
                aktorId: '1234567988888',
                veileder: false,
                startDato: '2018-01-31T10:46:10.971+01:00',
                sluttDato: null,
                begrunnelse: null,
            },];
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => userInfo);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);
        const wrapper = shallow(<AlertStripeContainer/>);
        expect(wrapper.containsMatchingElement(<></>)).toBeTruthy()
    })

});