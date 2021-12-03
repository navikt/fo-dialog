import React from 'react';

import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import StillingFraNavEtikett from './etiketter/StillingFraNavEtikett';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function StillingFraNavAktivitet(props: PropTypes) {
    const { stillingFraNavData } = props.aktivitet;
    if (!stillingFraNavData) return null;

    const { arbeidsgiver, arbeidssted, svarfrist, soknadsstatus } = stillingFraNavData;

    return (
        <>
            <InformasjonElement merkelapptekst="Arbeidsgiver" verdi={arbeidsgiver} />
            <InformasjonElement merkelapptekst="Arbeidssted" verdi={arbeidssted} />
            <InformasjonElement merkelapptekst="Svarfrist" verdi={formaterDate(svarfrist)} />
            {/*<LenkeInformasjonElement merkelapptekst="Les mer om stillingen" verdi={stillingFraNavData.lenke} />*/}
            <StillingFraNavEtikett etikett={soknadsstatus} />
        </>
    );
}
