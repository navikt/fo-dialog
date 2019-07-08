import React from "react";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PeriodeData} from "../utils/typer";
import * as AppContext from "../Context";
import {DialogOverview} from "./DialogOverview";
import {DialogOverviewHeader} from "./DialogOverviewHeader";
import {DialogPreview} from "./DialogPreview";

Enzyme.configure({ adapter: new Adapter() });


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
const dialoger = [
    {
        id: '3',
        aktivitetId: '2',
        overskrift: 'NOT USED',
        sisteTekst:
            'Det er viktig at du gjennomfører denne aktiviteten med NAV. Gjør du ikke det, kan det medføre at stønaden du mottar fra NAV bortfaller for en periode eller stanses. Hvis du ikke kan gjennomføre aktiviteten, ber vi deg ta kontakt med veilederen din så snart som mulig.',
        sisteDato: '2018-11-21T13:13:20.685+01:00',
        opprettetDato: '2018-11-21T13:13:20.663+01:00',
        historisk: false,
        lest: true,
        venterPaSvar: false,
        ferdigBehandlet: true,
        lestAvBrukerTidspunkt: null,
        erLestAvBruker: false,
        henvendelser: [
            {
                id: '4',
                dialogId: '3',
                avsender: 'VEILEDER',
                avsenderId: 'Z990286',
                sendt: '2018-11-21T13:13:20.685+01:00',
                lest: true,
                tekst:
                    'Det er viktig at du gjennomfører denne aktiviteten med NAV. Gjør du ikke det, kan det medføre at stønaden du mottar fra NAV bortfaller for en periode eller stanses. Hvis du ikke kan gjennomføre aktiviteten, ber vi deg ta kontakt med veilederen din så snart som mulig.',
            },
        ],
        egenskaper: ['PARAGRAF8'],
    }
];

describe( '<DialogOverview/>', () => {

    test("Bruker uten oppf.perioder og ikke under oppf skjuler store deler av appen", () => {
        oppfolgingData.underOppfolging = false;
        oppfolgingData.oppfolgingsPerioder = [];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);
        const wrapper = mount(<DialogOverview dialogData={dialoger} />);
        expect(wrapper.find(DialogOverviewHeader).exists()).toBeFalsy();
        expect(wrapper.find(DialogPreview).exists()).toBeFalsy();
    });
    test("Bruker ikke under oppf. skjuler knapper/checkbox", () => {
        oppfolgingData.underOppfolging = false;
        oppfolgingData.oppfolgingsPerioder = [{
            aktorId: '1234567988888',
            veileder: false,
            startDato: '2017-01-30T10:46:10.971+01:00',
            sluttDato: '2017-12-31T10:46:10.971+01:00',
            begrunnelse: null,
        }];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => oppfolgingData);
        const wrapper = mount(<DialogOverview dialogData={dialoger} />);
        expect(wrapper.find(DialogOverviewHeader).exists()).toBeFalsy();
        expect(wrapper.find(DialogPreview).exists()).toBeTruthy();
    });
    test("Bruker under oppf, elementer synes", () => {
        oppfolgingData.underOppfolging = true;
        oppfolgingData.oppfolgingsPerioder = [{
            aktorId: '1234567988888',
            veileder: false,
            startDato: '2017-01-30T10:46:10.971+01:00',
            sluttDato: '2017-12-31T10:46:10.971+01:00',
            begrunnelse: null,
        }];
        const wrapper = mount(<DialogOverview dialogData={dialoger} />);
        expect(wrapper.find(DialogOverviewHeader).exists()).toBeTruthy();
        expect(wrapper.find(DialogPreview).exists()).toBeTruthy();
    })
});