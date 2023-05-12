import { render } from '@testing-library/react';
import React from 'react';

import { ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/aktivitetTypes';
import GruppeAktivitet from './GruppeAktivitet';

describe('<GruppeAktivitet/>', () => {
    it('skal vise bare en dato hvis fraDato==tilDato', () => {
        const aktivitet: ArenaAktivitet = {
            type: ArenaAktivitetTypes.UTDANNINGSAKTIVITET,
            fraDato: '2018-09-06T14:53:43.519+02:00',
            tilDato: '2018-09-06T14:54:43.519+02:00',
            beskrivelse: 'test',
            moeteplanListe: null
        } as unknown as ArenaAktivitet;

        const { getByText } = render(<GruppeAktivitet aktivitet={aktivitet} />);

        getByText('Dato');
    });

    it('skal vise både fra og tildato dersom de er forskjellige', () => {
        const aktivitet: ArenaAktivitet = {
            type: ArenaAktivitetTypes.UTDANNINGSAKTIVITET,
            beskrivelse: null,
            fraDato: '2018-09-06T14:53:43.519+02:00',
            tilDato: '2018-09-07T14:53:43.519+02:00',
            moeteplanListe: null
        } as unknown as ArenaAktivitet;

        const { getByText } = render(<GruppeAktivitet aktivitet={aktivitet} />);

        getByText('Fra dato');
        getByText('Til dato');
    });
});
