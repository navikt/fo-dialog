import React from 'react';

import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import SokeStatusEtikett from './etiketter/sokeStatusEtikett';
import InformasjonElement, { LenkeInformasjonElement } from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function StillingAktivitet(props: PropTypes) {
    const { fraDato, tilDato, arbeidsgiver, kontaktperson, arbeidssted, beskrivelse, lenke, etikett } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Fra dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Frist" verdi={formaterDate(tilDato)} />
            <InformasjonElement merkelapptekst="Arbeidsgiver" verdi={arbeidsgiver} />
            <InformasjonElement merkelapptekst="Kontaktperson" verdi={kontaktperson} />
            <InformasjonElement merkelapptekst="Arbeidssted" verdi={arbeidssted} />
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
            <LenkeInformasjonElement merkelapptekst="Lenke" verdi={lenke} />
            <SokeStatusEtikett etikett={etikett} />
        </>
    );
}
