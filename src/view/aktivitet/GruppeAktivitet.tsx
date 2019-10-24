import React from 'react';
import { formaterDate } from '../../utils/Date';
import { ArenaAktivitet } from '../../utils/Typer';
import InformasjonElement from './InformasjonElement';

interface PropTypes {
    aktivitet: ArenaAktivitet;
}

//TODO: Trenger vi å vise møteplan? trenger eksempelrespons
export default function GruppeAktivitet(props: PropTypes) {
    const { fraDato, tilDato, beskrivelse } = props.aktivitet;
    const erGruppeDatoLike = formaterDate(fraDato) === formaterDate(tilDato);
    const fraDatoTekst = erGruppeDatoLike ? 'Dato' : 'Fra dato';

    return (
        <>
            <InformasjonElement merkelapptekst={fraDatoTekst} verdi={formaterDate(fraDato)} />
            {!erGruppeDatoLike ? <InformasjonElement merkelapptekst="Til dato" verdi={formaterDate(tilDato)} /> : null}
            <InformasjonElement merkelapptekst="Beskrivelse" verdi={beskrivelse} />
        </>
    );
}
