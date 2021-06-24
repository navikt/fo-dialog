import React from 'react';

import { SamtalereferatIkkeDelt } from '../../felleskomponenter/etiketer/Etikett';
import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import { useUserInfoContext } from '../Provider';
import InformasjonElement, { InformasjonElementRaw } from './InformasjonElement';
import { getKanalTekst } from './MoteAktivitet';

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function SamtalereferatAktivitet(props: PropTypes) {
    const { fraDato, kanal, referat, erReferatPublisert } = props.aktivitet;

    const bruker = useUserInfoContext();
    const erVeileder = !!bruker?.erVeileder;
    const referatPublisertElement = <InformasjonElement merkelapptekst="Referat" verdi={referat} />;
    const referatIkkePublisertElement = erVeileder ? (
        <InformasjonElementRaw merkelapptekst="Referat">
            {SamtalereferatIkkeDelt({ visible: true })}
        </InformasjonElementRaw>
    ) : null;
    const referatElement = erReferatPublisert ? referatPublisertElement : referatIkkePublisertElement;

    return (
        <>
            <InformasjonElement merkelapptekst="Dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Kanal" verdi={getKanalTekst(kanal)} />
            {referatElement}
        </>
    );
}
