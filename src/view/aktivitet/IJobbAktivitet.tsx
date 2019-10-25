import React from 'react';
import { formaterDate } from '../../utils/Date';
import { Aktivitet } from '../../utils/Typer';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function IJobbAktivitet(props: PropTypes) {
    const { fraDato, tilDato, jobbStatus, ansettelsesforhold, arbeidstid, beskrivelse } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} />
            <InformasjonElement merkelapptekst="Stillingsandel" verdi={jobbStatus} />
            <InformasjonElement merkelapptekst="Arbeidsgiver" verdi={ansettelsesforhold} />
            <InformasjonElement merkelapptekst="Ansettelsesforhold" verdi={arbeidstid} />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
