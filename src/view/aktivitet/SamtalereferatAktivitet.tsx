import React from 'react';

import { Aktivitet } from '../../utils/aktivitetTypes';
import { formaterDate } from '../../utils/Date';
import InformasjonElement, {InformasjonElementRaw} from './InformasjonElement';
import { getKanalTekst } from './MoteAktivitet';
import {SamtalereferatIkkeDelt} from "../../felleskomponenter/etiketer/Etikett";
import {erEksternBruker} from "../../mock/demo/sessionstorage";

interface PropTypes {
    aktivitet: Aktivitet;
}

export default function SamtalereferatAktivitet(props: PropTypes) {
    const { fraDato, kanal, referat, erReferatPublisert } = props.aktivitet;

    const referatPublisertElement = <InformasjonElement merkelapptekst="Referat" verdi={referat} />
    const referatIkkePublisertElement = erEksternBruker()
        ?
        null
        :
        <InformasjonElementRaw merkelapptekst="Referat">
           {SamtalereferatIkkeDelt({visible : !erEksternBruker()})}
        </InformasjonElementRaw>
    const referatElement = erReferatPublisert ? referatPublisertElement : referatIkkePublisertElement;

    return (
        <>
            <InformasjonElement merkelapptekst="Dato" verdi={formaterDate(fraDato)} />
            <InformasjonElement merkelapptekst="Kanal" verdi={getKanalTekst(kanal)} />
            {referatElement}
        </>
    );
}
