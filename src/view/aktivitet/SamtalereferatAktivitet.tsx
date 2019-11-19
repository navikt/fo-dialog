import React from 'react';
import { Aktivitet } from '../../utils/AktivitetTypes';
import InformasjonElement from './InformasjonElement';
import { formaterDate } from '../../utils/Date';

interface PropTypes {
    aktivitet: Aktivitet;
}

//TODO: Ok med referat her? har en annen type visning i aktivitetsplanen
export default function SamtalereferatAktivitet(props: PropTypes) {
    const { fraDato, kanal, referat } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Kanal" verdi={kanal} />
            <InformasjonElement merkelapptekst="Referat" verdi={referat} />
        </>
    );
}
