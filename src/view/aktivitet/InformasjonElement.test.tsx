import React from 'react';
import { mount, shallow } from 'enzyme';
import InformasjonElement from './InformasjonElement';
import { EtikettLiten, Undertekst } from 'nav-frontend-typografi';
import EksternLenke from '../../felleskomponenter/EksternLenke';
import '../../utils/SetupEnzyme';

describe('<InformasjonElement />', () => {
    it('skal vise fritekst hvis det er oppgitt', () => {
        const merkelapptekst = 'merkelappteksten';
        const verdi = 'Verdi på merkelapp';
        const wrapper = mount(<InformasjonElement merkelapptekst={merkelapptekst} verdi={verdi} />);

        expect(wrapper.find(EtikettLiten).exists).toBeTruthy();
        expect(wrapper.find(EtikettLiten).text()).toEqual(merkelapptekst);

        expect(wrapper.find(Undertekst).exists()).toBeTruthy();
        expect(wrapper.find(Undertekst).text()).toEqual(verdi);
    });

    it('skal vise children om det er oppgitt', () => {
        const merkelapptekst = 'merkelappteksten';
        const jsx = (
            <InformasjonElement merkelapptekst={merkelapptekst} verdi="">
                <EksternLenke lenke="nav.no" />
            </InformasjonElement>
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
            <InformasjonElement merkelapptekst={merkelapptekst} verdi="">
                <EksternLenke lenke="nav.no" />
            </InformasjonElement>
        );
        const wrapper = mount(jsx);

        expect(wrapper).toMatchSnapshot();
    });
});
