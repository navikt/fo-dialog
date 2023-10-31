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

    const formatertFraDato = fraDato ? formaterDate(fraDato) : 'Dato ikke satt';
    const formatertTilDato = tilDato ? formaterDate(tilDato) : 'Dato ikke satt';

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formatertFraDato} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formatertTilDato} />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
