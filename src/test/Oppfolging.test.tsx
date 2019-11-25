import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, RouteComponentProps } from 'react-router';
import * as AppContext from '../view/Provider';
import { Dialog } from '../view/dialog/Dialog';
import { DialogData, OppfolgingData, PeriodeData } from '../utils/Typer';
import { HenvendelseList } from '../view/henvendelse/HenvendelseList';
import { DialogInputBox } from '../view/dialog/DialogInputBox';
import { DialogHeader } from '../view/dialog/DialogHeader';
import DialogOversikt from '../view/dialogoversikt/DialogOversikt';
import { DialogOverviewHeader } from '../view/dialogoversikt/DialogOverviewHeader';
import { DialogPreview } from '../view/dialogoversikt/DialogPreview';
import { Checkbox } from 'nav-frontend-skjema';
import { FetchResult, Status } from '@nutgaard/use-fetch';
import '../utils/SetupEnzyme';
const bruker = {
    erVeileder: true,
    erBruker: false,
    id: 'kake'
};
const oppfPerioder: PeriodeData[] = [];
const oppfolgingData: OppfolgingData = {
    fnr: null,
    veilederId: '101010',
    reservasjonKRR: false,
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
    inaktiveringsdato: '2018-08-31T10:46:10.971+01:00',
    aktorId: null,
    erSykmeldtMedArbeidsgiver: false,
    formidlingsgruppe: null,
    kanVarsles: true,
    servicegruppe: null
};
const useFetchOppfolging: FetchResult<OppfolgingData> = {
    status: Status.OK,
    statusCode: 0,
    data: oppfolgingData,
    rerun(): void {}
};
const dialoger = [
    {
        id: '1',
        aktivitetId: '1',
        overskrift: 'Memes',
        sisteTekst: 'Hei. Hva er status her? Har du finnet Kaptain Sabeltann?',
        sisteDato: '2018-01-28T12:48:56.097+01:00',
        opprettetDato: '2018-02-27T12:48:56.081+01:00',
        historisk: false,
        lest: true,
        venterPaSvar: false,
        ferdigBehandlet: false,
        lestAvBrukerTidspunkt: null,
        erLestAvBruker: false,
        henvendelser: [
            {
                id: '1',
                dialogId: '1',
                avsender: 'VEILEDER',
                avsenderId: 'Z123456',
                sendt: '2018-02-27T12:48:56.097+01:00',
                lest: true,
                tekst: 'Hei. Hva er status her? Har du finnet Kaptain Sabeltann?'
            },
            {
                id: '2',
                dialogId: '1',
                avsender: 'BRUKER',
                avsenderId: '0102030405',
                sendt: '2018-02-28T12:48:56.097+01:00',
                lest: true,
                tekst: 'Hei. Leter enda på sjøen :)'
            }
        ],
        egenskaper: []
    }
];
const useFetchDialoger: FetchResult<DialogData[]> = {
    status: Status.OK,
    statusCode: 0,
    data: dialoger,
    rerun(): void {}
};

describe('<DialogOversikt/>', () => {
    test('Bruker uten oppf.perioder og ikke under oppf skjuler store deler av appen', () => {
        useFetchOppfolging.data.underOppfolging = false;
        useFetchOppfolging.data.oppfolgingsPerioder = [];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        const wrapper = mount(
            <MemoryRouter>
                <DialogOversikt />
            </MemoryRouter>
        );
        expect(wrapper.find(DialogOverviewHeader).exists()).toBeFalsy();
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
        expect(wrapper.find(DialogPreview).exists()).toBeFalsy();
    });
    test('Bruker ikke under oppf. skjuler knapper/checkbox', () => {
        useFetchOppfolging.data.underOppfolging = false;
        useFetchOppfolging.data.oppfolgingsPerioder = [
            {
                aktorId: '1234567988888',
                veileder: false,
                startDato: '2017-01-30T10:46:10.971+01:00',
                sluttDato: '2017-12-31T10:46:10.971+01:00',
                begrunnelse: null
            }
        ];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useDialogContext').mockImplementation(() => useFetchDialoger);
        const wrapper = mount(
            <MemoryRouter>
                <DialogOversikt />
            </MemoryRouter>
        );
        expect(wrapper.find(DialogOverviewHeader).exists()).toBeFalsy();
        expect(wrapper.find(DialogPreview).exists()).toBeTruthy();
    });
    test('Bruker under oppf, elementer synes', () => {
        useFetchOppfolging.data.underOppfolging = true;
        useFetchOppfolging.data.oppfolgingsPerioder = [
            {
                aktorId: '1234567988888',
                veileder: false,
                startDato: '2017-01-30T10:46:10.971+01:00',
                sluttDato: '2017-12-31T10:46:10.971+01:00',
                begrunnelse: null
            }
        ];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useDialogContext').mockImplementation(() => useFetchDialoger);
        const wrapper = mount(
            <MemoryRouter>
                <DialogOversikt />
            </MemoryRouter>
        );
        expect(wrapper.find(DialogOverviewHeader).exists()).toBeTruthy();
        expect(wrapper.find(DialogPreview).exists()).toBeTruthy();
    });
});

describe('<Dialog/>', () => {
    test('Bruker ikke under oppf. skjuler dialogcontroller og viser fortsatt henvendelser', () => {
        useFetchOppfolging.data.underOppfolging = false;
        useFetchOppfolging.data.oppfolgingsPerioder = [
            {
                aktorId: '1234567988888',
                veileder: false,
                startDato: '2017-01-30T10:46:10.971+01:00',
                sluttDato: '2017-12-31T10:46:10.971+01:00',
                begrunnelse: null
            }
        ];
        jest.spyOn(AppContext, 'useDialogContext').mockImplementation(() => useFetchDialoger);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        Element.prototype.scrollIntoView = () => {};
        const wrapper = mount(
            <MemoryRouter>
                <Dialog {...lagRouterProps('1')} />
            </MemoryRouter>
        );
        expect(wrapper.find(DialogInputBox).exists()).toBeFalsy();
        expect(wrapper.find(HenvendelseList).exists()).toBeTruthy();
        expect(wrapper.find(Checkbox).exists()).toBeFalsy();
    });
    test('Bruker under oppf. viser komponenter i Dialog', () => {
        useFetchOppfolging.data.underOppfolging = true;
        useFetchOppfolging.data.oppfolgingsPerioder = [
            {
                aktorId: '1234567988888',
                veileder: false,
                startDato: '2017-01-30T10:46:10.971+01:00',
                sluttDato: '2017-12-31T10:46:10.971+01:00',
                begrunnelse: null
            }
        ];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
        Element.prototype.scrollIntoView = () => {};
        const wrapper = mount(
            <MemoryRouter>
                <Dialog {...lagRouterProps('1')} />
            </MemoryRouter>
        );
        expect(wrapper.find(DialogHeader).exists()).toBeTruthy();
        expect(wrapper.find(DialogInputBox).exists()).toBeTruthy();
        expect(wrapper.find(HenvendelseList).exists()).toBeTruthy();
    });
});

function lagRouterProps(dialogId: string): RouteComponentProps<{ dialogId?: string }> {
    return {
        history: undefined as any,
        location: undefined as any,
        match: { params: { dialogId } } as any
    };
}
