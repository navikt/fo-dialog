import { render } from '@testing-library/react';
import React from 'react';
import { expect } from 'vitest';

import { Status } from '../../api/typer';
import { HarNivaa4Response } from '../../api/useFetchHarNivaa4';
import { Bruker, OppfolgingData, PeriodeData } from '../../utils/Typer';
import * as BrukerContext from '../BrukerProvider';
import * as OppfolgingContext from '../OppfolgingProvider';
import { OppfolgingDataProviderType } from '../OppfolgingProvider';
import * as AppContext from '../Provider';
import AldriUnderOppfolging from './AldriUnderOppfolging';
import IkkeUnderOppfolging from './IkkeUnderOppfolging';
import { ManglerNivaa4, Nivaa4Feiler } from './Nivaa4';
import ReservertKrr from './ReservertKrr';
import StatusAdvarsel from './StatusAdvarsel';

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

const useFetchOppfolging: OppfolgingDataProviderType = {
    data: oppfolgingData,
    status: Status.OK,
    hentOppfolging: () => Promise.resolve(undefined)
};

const useNivaa4: HarNivaa4Response = {
    harNivaa4: true,
    hasError: false,
    isPending: false
};

describe('<AlertStripeContainer/>', () => {
    it('Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - veileder.', () => {
        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => veileder);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const { getByText } = render(<StatusAdvarsel />);
        getByText('Denne brukeren har ikke tidligere dialoger i Modia.');
    });
    it('Bruker uten oppf.perioder og ikke under oppf. viser en advarsel - bruker. ', () => {
        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => bruker);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const { getByText } = render(<StatusAdvarsel />);
        getByText('Du må være registrert hos NAV for å ha digital dialog med veileder.');
    });
    it('Bruker med oppf.perioder og ikke under oppf. viser en advarsel - bruker. ', () => {
        useFetchOppfolging.data!.oppfolgingsPerioder = oppfPerioder;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => bruker);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const { getByText, getByRole } = render(<StatusAdvarsel />);
        getByText(
            'Du er ikke lenger registrert hos NAV. Hvis du fortsatt skal få oppfølging fra NAV og ha dialog med veileder må du være registrert.'
        );
        expect(getByRole('link').textContent).toBe('Registrer deg hos NAV');
    });
    it('Bruker med oppf.perioder, ikke under oppf. gir ingen feilmelding - veileder', () => {
        useFetchOppfolging.data!.oppfolgingsPerioder = oppfPerioder;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => veileder);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = render(<StatusAdvarsel />);
        expect(wrapper.baseElement.textContent).toBeFalsy();
    });

    it('Bruker registret KRR viser en advarsel - veileder.', () => {
        useFetchOppfolging.data!.underOppfolging = true;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => veileder);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const { getByText } = render(<StatusAdvarsel />);
        getByText('Du kan ikke kontakte denne brukeren elektronisk.');
    });
    it('Bruker registret KRR viser en advarsel - bruker. ', () => {
        useFetchOppfolging.data!.underOppfolging = true;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => bruker);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const { getByText, getByRole } = render(<StatusAdvarsel />);
        getByText(
            'For å ta i bruk den digitale dialogen med din veileder, må du fjerne reservasjonen din mot digital kommunikasjon.'
        );
        expect(getByRole('link').textContent).toBe('Gå til Norge.no for å fjerne reservasjonen');
    });
    // test('Bruker kan ikke varsles viser en advarsel - bruker. ', () => {
    //     useFetchOppfolging.data.underOppfolging = true;
    //     useFetchOppfolging.data.reservasjonKRR = false;
    //
    //     jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => bruker);
    //     jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
    //
    //     const wrapper = render(<AlertStripeContainer />);
    //     expect(wrapper.matchesElement(<KanIkkeVarsles erVeileder={false} />)).toBeTruthy();
    // });
    // test('Bruker kan ikke varsles viser en advarsel - veileder', () => {
    //     useFetchOppfolging.data.underOppfolging = true;
    //     useFetchOppfolging.data.reservasjonKRR = false;
    //
    //     jest.spyOn(AppContext, 'useUserInfoContext').mockImplementation(() => veileder);
    //     jest.spyOn(AppContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
    //
    //     const wrapper = render(<AlertStripeContainer />);
    //     expect(wrapper.matchesElement(<KanIkkeVarsles erVeileder={true} />)).toBeTruthy();
    // });

    it('ManglerNivaa4 - veileder', () => {
        useFetchOppfolging.data!.underOppfolging = true;
        useFetchOppfolging.data!.reservasjonKRR = false;
        useFetchOppfolging.data!.kanVarsles = true;

        useNivaa4.harNivaa4 = false;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => veileder);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const { getByText } = render(<StatusAdvarsel />);
        getByText('Denne brukeren kan ikke logge inn i aktivitetsplan og dialog.');
    });

    it('Nivaa4Feiler - veileder', () => {
        useFetchOppfolging.data!.underOppfolging = true;
        useFetchOppfolging.data!.reservasjonKRR = false;
        useFetchOppfolging.data!.kanVarsles = true;

        useNivaa4.harNivaa4 = false;
        useNivaa4.hasError = true;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => veileder);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const { getByText } = render(<StatusAdvarsel />);
        getByText('Noe gikk galt, og du får dessverre ikke sendt dialogmeldinger. Prøv igjen senere.');
    });

    it('ingen varsler for gyldig status - veileder', () => {
        useFetchOppfolging.data!.underOppfolging = true;
        useFetchOppfolging.data!.reservasjonKRR = false;
        useFetchOppfolging.data!.kanVarsles = true;

        useNivaa4.harNivaa4 = true;
        useNivaa4.hasError = false;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => veileder);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = render(<StatusAdvarsel />);
        expect(wrapper.baseElement.textContent).toBeFalsy();
    });

    it('ingen varsler for gyldig status - bruker. ', () => {
        useFetchOppfolging.data!.underOppfolging = true;
        useFetchOppfolging.data!.reservasjonKRR = false;
        useFetchOppfolging.data!.kanVarsles = true;

        useNivaa4.harNivaa4 = true;
        useNivaa4.hasError = false;

        vi.spyOn(BrukerContext, 'useUserInfoContext').mockImplementation(() => bruker);
        vi.spyOn(OppfolgingContext, 'useOppfolgingContext').mockImplementation(() => useFetchOppfolging);
        vi.spyOn(AppContext, 'useHarNivaa4Context').mockImplementation(() => useNivaa4);

        const wrapper = render(<StatusAdvarsel />);
        expect(wrapper.baseElement.textContent).toBeFalsy();
    });
});
