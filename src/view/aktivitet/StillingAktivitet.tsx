import React from 'react';
import { formaterDate } from '../../utils/Date';
import { Aktivitet } from '../../utils/AktivitetTypes';
import InformasjonElement, { InformasjonElementRaw } from './InformasjonElement';
import EksternLenke from '../../felleskomponenter/EksternLenke';
import SokeStatusEtikett from './etiketter/sokeStatusEtikett';

interface PropTypes {
    aktivitet: Aktivitet;
}

//TODO: Må sette tekst "Dato ikke satt" på tildato?
//TODO: Skal statusetikettene synes?
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
            <InformasjonElementRaw merkelapptekst="Lenke">
                <EksternLenke lenke={lenke} />
            </InformasjonElementRaw>
            <SokeStatusEtikett etikett={etikett} />
        </>
    );
}
