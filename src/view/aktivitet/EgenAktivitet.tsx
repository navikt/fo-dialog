import React from 'react';
import { formaterDate } from '../../utils/Date';
import { Aktivitet } from '../../utils/AktivitetTypes';
import InformasjonElement, { InformasjonElementRaw } from './InformasjonElement';
import EksternLenke from '../../felleskomponenter/EksternLenke';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function EgenAktivitet(props: PropTypes) {
    const { fraDato, tilDato, hensikt, oppfolging, beskrivelse, lenke } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} />
            <InformasjonElement merkelapptekst="Mål med aktiviteten" verdi={hensikt} />
            <InformasjonElement merkelapptekst="Min huskeliste" verdi={oppfolging} />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
            <InformasjonElementRaw merkelapptekst="Lenke">
                <EksternLenke lenke={lenke} />
            </InformasjonElementRaw>
        </>
    );
}
