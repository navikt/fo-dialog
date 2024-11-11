import React from 'react';

import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function BehandlingAktivitet(props: PropTypes) {
    const { fraDato, tilDato, behandlingType, behandlingSted, effekt, behandlingOppfolging, beskrivelse } =
        props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} />
            <InformasjonElement merkelapptekst="Behandlingstype" verdi={behandlingType} />
            <InformasjonElement merkelapptekst="Behandlingssted" verdi={behandlingSted} />
            <InformasjonElement merkelapptekst="Mål for behandlingen" verdi={effekt} />
            <InformasjonElement merkelapptekst="Oppfølging fra Nav" verdi={behandlingOppfolging} />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
