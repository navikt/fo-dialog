import React from 'react';

import { ArenaAktivitet } from '../../utils/AktivitetTypes';
import { formaterDate } from '../../utils/Date';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: ArenaAktivitet;
}

export default function TiltakAktivitet(props: PropTypes) {
    const { fraDato, tilDato, arrangoer, deltakelseProsent, antallDagerPerUke, beskrivelse } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} />
            <InformasjonElement merkelapptekst="Arrangør" verdi={arrangoer} />
            <InformasjonElement
                merkelapptekst="Deltakelse"
                verdi={deltakelseProsent ? deltakelseProsent.toString() : ''}
            />
            <InformasjonElement
                merkelapptekst="Antall dager per uke"
                verdi={antallDagerPerUke ? antallDagerPerUke.toString() : ''}
            />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
