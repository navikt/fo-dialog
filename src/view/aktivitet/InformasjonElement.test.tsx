import { render } from '@testing-library/react';
import React from 'react';

import EksternLenke from '../../felleskomponenter/EksternLenke';
import InformasjonElement, { InformasjonElementRaw } from './InformasjonElement';

describe('<InformasjonElement />', () => {
    it('skal vise fritekst hvis det er oppgitt', () => {
        const merkelapptekst = 'merkelappteksten';
        const verdi = 'Verdi på merkelapp';
        const { getByText, getByRole } = render(<InformasjonElement merkelapptekst={merkelapptekst} verdi={verdi} />);

        expect(getByRole('heading').textContent).toEqual(merkelapptekst);
        getByText(verdi);
    });

    it('skal vise children om det er oppgitt', () => {
        const ele = (
            <InformasjonElementRaw merkelapptekst={'tekst'}>
                <EksternLenke lenke="nav.no" />
            </InformasjonElementRaw>
        );
        const { getByRole } = render(ele);
        getByRole('link');
    });

    it('skal skjules om hverken tekst eller children er oppgitt', () => {
        const merkelapptekst = 'merkelappteksten';
        const { getByText } = render(<InformasjonElement merkelapptekst={merkelapptekst} verdi={null} />);

        expect(() => getByText(merkelapptekst)).toThrow();
    });

    it('skal matche snapshot når EksternLenke er child', () => {
        const merkelapptekst = 'merkelappteksten';
        const ele = (
            <InformasjonElementRaw merkelapptekst={merkelapptekst}>
                <EksternLenke lenke="nav.no" />
            </InformasjonElementRaw>
        );
        const wrapper = render(ele);

        expect(wrapper.baseElement).toMatchSnapshot();
    });
});
