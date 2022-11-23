import React from 'react';

import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function EksternAktivitet({ aktivitet }: PropTypes) {
    const { fraDato, tilDato, beskrivelse, eksternAktivitet } = aktivitet;
    if (!eksternAktivitet) return null;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
