import React from 'react';

import GruppeAktivitet from './GruppeAktivitet';
import { shallow } from 'enzyme';
import { ArenaAktivitetTypes } from '../../utils/AktivitetTypes';
import '../../utils/SetupEnzyme';

describe('<GruppeAktivitet/>', () => {
    it('skal vise bare en dato hvis fraDato==tilDato', () => {
        const aktivitet: any = {
            type: ArenaAktivitetTypes.UTDANNINGSAKTIVITET,
            fraDato: '2018-09-06T14:53:43.519+02:00',
            tilDato: '2018-09-06T14:54:43.519+02:00',
            beskrivelse: 'test',
            moeteplanListe: null
        };
        const wrapper = shallow(<GruppeAktivitet aktivitet={aktivitet} />);
        expect(wrapper.find('[merkelapptekst="Dato"]').length).toBe(1);
        expect(wrapper.find('[merkelapptekst="Fra dato"]').length).toBe(0);
    });

    it('skal vise både fra og tildato dersom de er forskjellige', () => {
        const aktivitet: any = {
            type: ArenaAktivitetTypes.UTDANNINGSAKTIVITET,
            beskrivelse: null,
            fraDato: '2018-09-06T14:53:43.519+02:00',
            tilDato: '2018-09-07T14:53:43.519+02:00',
            moeteplanListe: null
        };

        const wrapper = shallow(<GruppeAktivitet aktivitet={aktivitet} />);
        expect(wrapper.find('[merkelapptekst="Dato"]').length).toBe(0);
        expect(wrapper.find('[merkelapptekst="Fra dato"]').length).toBe(1);
        expect(wrapper.find('[merkelapptekst="Til dato"]').length).toBe(1);
    });
});
