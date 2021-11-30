import React from 'react';

import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function StillingFraNavAktivitet(props: PropTypes) {
    const { stillingFraNavData } = props.aktivitet;
    if (!stillingFraNavData) return null;
    /*
        stillingFraNavData: {
        cvKanDelesData: null,
        arbeidsgiver: 'Havsalt AS',
        arbeidssted: 'Kristiansand',
        lenke: 'www.nav.no',
        svarfrist: '2021-07-29T10:46:51.622+01:00',
        kontaktpersonData: {
            navn: 'Sykfest Strutle',
            tittel: 'NAV-ansatt',
            mobil: null
        }
     */

    return (
        <>
            <InformasjonElement merkelapptekst="Arbeidsgiver" verdi={stillingFraNavData.arbeidsgiver} />
            <InformasjonElement merkelapptekst="Arbeidssted" verdi={stillingFraNavData.arbeidssted} />
            <InformasjonElement merkelapptekst="Svarfrist" verdi={formaterDate(stillingFraNavData.svarfrist)} />
            {/*<LenkeInformasjonElement merkelapptekst="Les mer om stillingen" verdi={stillingFraNavData.lenke} />*/}
            {/* <SokeStatusEtikett etikett={etikett} />*/}
        </>
    );
}
