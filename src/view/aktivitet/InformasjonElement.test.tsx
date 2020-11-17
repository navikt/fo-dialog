import '../../utils/SetupEnzyme';

import { mount, shallow } from 'enzyme';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { EtikettLiten } from 'nav-frontend-typografi';
import React from 'react';

import EksternLenke from '../../felleskomponenter/EksternLenke';
import InformasjonElement, { InformasjonElementRaw } from './InformasjonElement';

describe('<InformasjonElement />', () => {
    it('skal vise fritekst hvis det er oppgitt', () => {
        const merkelapptekst = 'merkelappteksten';
        const verdi = 'Verdi på merkelapp';
        const wrapper = mount(<InformasjonElement merkelapptekst={merkelapptekst} verdi={verdi} />);

        expect(wrapper.find(EtikettLiten).exists).toBeTruthy();
        expect(wrapper.find(EtikettLiten).text()).toEqual(merkelapptekst);

        expect(wrapper.find(Tekstomrade).exists()).toBeTruthy();
        expect(wrapper.find(Tekstomrade).text()).toEqual(verdi);
    });

    it('skal vise children om det er oppgitt', () => {
        const merkelapptekst = 'merkelappteksten';
        const jsx = (
            <InformasjonElementRaw merkelapptekst={merkelapptekst}>
                <EksternLenke lenke="nav.no" />
            </InformasjonElementRaw>
        );
        const wrapper = mount(jsx);

        expect(wrapper.find(EtikettLiten).exists).toBeTruthy();
        expect(wrapper.find(EtikettLiten).text()).toEqual(merkelapptekst);
        expect(wrapper.find(EksternLenke).exists()).toBeTruthy();
    });

    it('skal skjules om hverken tekst eller children er oppgitt', () => {
        const merkelapptekst = 'merkelappteksten';
        const wrapper = shallow(<InformasjonElement merkelapptekst={merkelapptekst} verdi={null} />);
        expect(wrapper.find(EtikettLiten).exists()).toBeFalsy();
    });

    it('skal matche snapshot når EksternLenke er child', () => {
        const merkelapptekst = 'merkelappteksten';
        const jsx = (
            <InformasjonElementRaw merkelapptekst={merkelapptekst}>
                <EksternLenke lenke="nav.no" />
            </InformasjonElementRaw>
        );
        const wrapper = mount(jsx);

        expect(wrapper).toMatchSnapshot();
    });
});
