import React from 'react';
import { mount } from 'enzyme';
import EksternLenke from './EksternLenke';
import Lenke from 'nav-frontend-lenker';
import '../utils/SetupEnzyme';

describe('<EksternLenke/>', () => {
    it('skal padde href med protokoll når det mangler', () => {
        const tekst = 'nav.no';
        const wrapper = mount(<EksternLenke lenke={tekst} />);
        const lenke = wrapper.find(Lenke);

        expect(lenke.prop('href')).toEqual('http://nav.no');
        expect(lenke.text()).toEqual(tekst);
    });

    it('skal ikke padde href med protokoll, http', () => {
        const tekst = 'http://nav.no';
        const wrapper = mount(<EksternLenke lenke={tekst} />);
        const lenke = wrapper.find(Lenke);

        expect(lenke.prop('href')).toEqual('http://nav.no');
        expect(lenke.text()).toEqual(tekst);
    });

    it('skal ikke padde href med protokoll, https', () => {
        const tekst = 'https://nav.no';
        const wrapper = mount(<EksternLenke lenke={tekst} />);
        const lenke = wrapper.find(Lenke);

        expect(lenke.prop('href')).toEqual('https://nav.no');
        expect(lenke.text()).toEqual(tekst);
    });

    it('skal padde href med protokoll når det mangler', () => {
        const tekst = 'www.nav.no';
        const wrapper = mount(<EksternLenke lenke={tekst} />);
        const lenke = wrapper.find(Lenke);

        expect(lenke.prop('href')).toEqual('http://www.nav.no');
        expect(lenke.text()).toEqual(tekst);
    });
});
