import React from 'react';
import { formaterDate, getKlokkeslett, getVarighet } from '../../utils/Date';
import { Aktivitet, KanalTypes } from '../../utils/Typer';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function MoteAktivitet(props: PropTypes) {
    const { fraDato, tilDato, kanal, adresse, beskrivelse, forberedelser } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Klokkeslett" verdi={getKlokkeslett(fraDato)} />
            <InformasjonElement merkelapptekst="Kanal" verdi={getText(kanal)} />
            <InformasjonElement merkelapptekst="Varighet" verdi={getVarighet(fraDato, tilDato)} />
            <InformasjonElement merkelapptekst="Adresse" verdi={adresse} />
            <InformasjonElement merkelapptekst="Bakgrunn" verdi={beskrivelse} />
            <InformasjonElement merkelapptekst="Forberedelser" verdi={forberedelser} />
        </>
    );
}

function getText(kanal: KanalTypes) {
    switch (kanal) {
        case KanalTypes.OPPMOTE:
            return 'Oppmøte';
        case KanalTypes.TELEFON:
            return 'Telefonmøte';
        case KanalTypes.INTERNETT:
            return 'Nettmøte';
    }
    return '';
}
