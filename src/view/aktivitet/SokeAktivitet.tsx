import React from 'react';
import { formaterDate } from '../../utils/Date';
import { Aktivitet } from '../../utils/Typer';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function SokeAktivitet(props: PropTypes) {
    const { fraDato, tilDato, antallStillingerIUken, antallStillingerSokes, beskrivelse } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} />
            <InformasjonElement
                merkelapptekst="Antall søknader i perioden"
                verdi={antallStillingerSokes ? antallStillingerSokes.toString() : ''}
            />
            <InformasjonElement
                merkelapptekst="Antall søknader i uken"
                verdi={antallStillingerIUken ? antallStillingerIUken.toString() : ''}
            />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
