import '../utils/SetupEnzyme';

import { Status as FetchMockStatus, FetchResult } from '@nutgaard/use-fetch';
import { mount } from 'enzyme';
import { Checkbox } from 'nav-frontend-skjema';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { Bruker, DialogData, OppfolgingData, PeriodeData } from '../utils/Typer';
import { Dialog } from '../view/dialog/Dialog';
import DialogContainer from '../view/dialog/DialogContainer';
import { DialogHeader } from '../view/dialog/DialogHeader';
import HenvendelseInputBox from '../view/dialog/henvendelseInput/HenvendelseInputBox';
import DialogListe from '../view/dialogliste/DialogListe';
import DialogOversikt from '../view/dialogliste/DialogOversikt';
import DialogPreview from '../view/dialogliste/DialogPreview';
import { NyDialogLink } from '../view/dialogliste/NyDialogLink';
import * as DialogProvider from '../view/DialogProvider';
import { DialogDataProviderType } from '../view/DialogProvider';
import { HenvendelseList } from '../view/henvendelse/HenvendelseList';
import * as AppContext from '../view/Provider';

const userInfo: Bruker = { id: '010101', erVeileder: true, erBruker: false };
const oppfPerioder: PeriodeData[] = [];
const oppfolgingData: OppfolgingData = {
    fnr: 'null',
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
    aktorId: 'null',
    erSykmeldtMedArbeidsgiver: false,
    formidlingsgruppe: null,
    kanVarsles: true,
    servicegruppe: null
};
const useFetchOppfolging: FetchResult<OppfolgingData> = {
    status: FetchMockStatus.OK,
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
                tekst: 'Hei. Hva er status her? Har du finnet Kaptain Sabeltann?',
                viktig: false
            },
            {
                id: '2',
                dialogId: '1',
                avsender: 'BRUKER',
                avsenderId: '0102030405',
                sendt: '2018-02-28T12:48:56.097+01:00',
                lest: true,
                tekst: 'Hei. Leter enda på sjøen :)',
                viktig: false
            }
        ],
        egenskaper: []
    }
];
const useDialogContext: DialogDataProviderType = {
    status: 3,
    dialoger: dialoger,
    hentDialoger: () => Promise.resolve([]),
    nyDialog: (melding: string, tema: string, aktivitetId?: string) => Promise.resolve({} as any),
    nyHenvendelse: (melding: string, dialog: DialogData) => Promise.resolve(dialog),
    lesDialog: (dialogId: string) => Promise.resolve(dialoger.find((dialog) => dialog.id === dialogId)!!),
    setFerdigBehandlet: (dialog: DialogData, ferdigBehandlet: boolean) => Promise.resolve(dialog),
    setVenterPaSvar: (dialog: DialogData, venterPaSvar: boolean) => Promise.resolve(dialog)
};

describe('<DialogContainer/>', () => {
    test('Bruker uten oppf.perioder og ikke under oppf skjuler store deler av appen', () => {
        useFetchOppfolging.data.underOppfolging = false;
        useFetchOppfolging.data.oppfolgingsPerioder = [];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        const wrapper = mount(
            <MemoryRouter>
                <DialogListe />
            </MemoryRouter>
        );
        expect(wrapper.find(NyDialogLink).exists()).toBeFalsy();
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
                begrunnelse: null,
                kvpPerioder: []
            }
        ];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(DialogProvider, 'useDialogContext').mockImplementation(() => useDialogContext);
        const wrapper = mount(
            <MemoryRouter>
                <DialogListe />
            </MemoryRouter>
        );
        expect(wrapper.find(NyDialogLink).exists()).toBeFalsy();
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
                begrunnelse: null,
                kvpPerioder: []
            }
        ];
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => ({
            harNivaa4: true,
            hasError: false,
            isPending: false
        }));
        jest.spyOn(DialogProvider, 'useDialogContext').mockImplementation(() => useDialogContext);
        const wrapper = mount(
            <MemoryRouter>
                <DialogOversikt />
            </MemoryRouter>
        );
        expect(wrapper.find(NyDialogLink).exists()).toBeTruthy();
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
                begrunnelse: null,
                kvpPerioder: []
            }
        ];
        jest.spyOn(DialogProvider, 'useDialogContext').mockImplementation(() => useDialogContext);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        Element.prototype.scrollIntoView = () => {};
        const wrapper = mount(
            <MemoryRouter initialEntries={['/1']}>
                <DialogContainer />
            </MemoryRouter>
        );
        expect(wrapper.find(HenvendelseInputBox).exists()).toBeTruthy();
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
                begrunnelse: null,
                kvpPerioder: []
            }
        ];
        jest.spyOn(DialogProvider, 'useDialogContext').mockImplementation(() => useDialogContext);
        jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => userInfo);
        jest.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => ({
            harNivaa4: true,
            hasError: false,
            isPending: false
        }));
        Element.prototype.scrollIntoView = () => {};
        const wrapper = mount(
            <MemoryRouter initialEntries={['/1']}>
                <DialogContainer />
            </MemoryRouter>
        );
        expect(wrapper.find(DialogHeader).exists()).toBeTruthy();
        expect(wrapper.find(HenvendelseInputBox).exists()).toBeTruthy();
        expect(wrapper.find(HenvendelseList).exists()).toBeTruthy();
    });
});
