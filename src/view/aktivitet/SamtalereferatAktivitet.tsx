import React from 'react';

import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import InformasjonElement from './InformasjonElement';
import { getKanalTekst } from './MoteAktivitet';

interface PropTypes {
    aktivitet: Aktivitet;
}

//TODO: Ok med referat her? har en annen type visning i aktivitetsplanen
export default function SamtalereferatAktivitet(props: PropTypes) {
    const { fraDato, kanal, referat } = props.aktivitet;

    return (
        <>
            <InformasjonElement merkelapptekst="Dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Kanal" verdi={getKanalTekst(kanal!!)} />
            <InformasjonElement merkelapptekst="Referat" verdi={referat} />
        </>
    );
}
