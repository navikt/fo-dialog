import { render } from '@testing-library/react';
import React from 'react';

import EksternLenke from './EksternLenke';

// TODO skip til vi er ferdig med migrering til nytt designsystem
describe.skip('<EksternLenke/>', () => {
    it('skal padde href med protokoll når det mangler', () => {
        const tekst = 'nav.no';
        const wrapper = render(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('skal ikke padde href med protokoll, http', () => {
        const tekst = 'http://nav.no';
        const wrapper = render(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('skal ikke padde href med protokoll, https', () => {
        const tekst = 'https://nav.no';
        const wrapper = render(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('skal padde href med protokoll når det mangler, www', () => {
        const tekst = 'www.nav.no';
        const wrapper = render(<EksternLenke lenke={tekst} />);

        expect(wrapper).toMatchSnapshot();
    });
});
