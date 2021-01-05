import React from 'react';

import { ArenaAktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: ArenaAktivitet;
}

export default function UtdanningAktivitet(props: PropTypes) {
    const { fraDato, tilDato, beskrivelse } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
