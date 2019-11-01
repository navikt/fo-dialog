import React from 'react';
import { shallow } from 'enzyme';
import EksternLenke from './EksternLenke';
import '../utils/SetupEnzyme';

describe('<EksternLenke/>', () => {
    it('skal padde href med protokoll når det mangler', () => {
        const tekst = 'nav.no';
        const wrapper = shallow(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('skal ikke padde href med protokoll, http', () => {
        const tekst = 'http://nav.no';
        const wrapper = shallow(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('skal ikke padde href med protokoll, https', () => {
        const tekst = 'https://nav.no';
        const wrapper = shallow(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('skal padde href med protokoll når det mangler, www', () => {
        const tekst = 'www.nav.no';
        const wrapper = shallow(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });
});
