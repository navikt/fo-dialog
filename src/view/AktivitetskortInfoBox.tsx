import React from 'react';
import {Aktivitet} from "../utils/typer";
import {EtikettLiten, Ingress, Undertekst, Undertittel} from "nav-frontend-typografi";
import {formaterDate, formaterDateAndTime} from "../utils/date";

interface Props{
    aktivitet: Aktivitet;
}

export function AktivitetskortInfoBox(props: Props) {


    const fraDato = props.aktivitet.fraDato ? formaterDate(props.aktivitet.fraDato): null;
    const tilDato = props.aktivitet.tilDato ? formaterDate(props.aktivitet.tilDato): null;

    return( <>
        <div className="aktivitetkort__infobox__row">
            <div className="aktivitetkort__infobox__row__item">
                <EtikettLiten> Fra dato</EtikettLiten>
                <Undertekst>{fraDato}</Undertekst>
            </div>
            <div className="aktivitetkort__infobox__row__item">
                <EtikettLiten> Frist</EtikettLiten>
                <Undertekst>{tilDato}</Undertekst>
            </div>

        </div>
        <div className="aktivitetkort__infobox__row">
            <div className="aktivitetkort__infobox__row__item">
                <EtikettLiten> Arbeidsgiver</EtikettLiten>
                <Undertekst>{props.aktivitet.arbeidsgiver}</Undertekst>
            </div>
            <div className="aktivitetkort__infobox__row__item">
                <EtikettLiten>Arbiedssted</EtikettLiten>
                <Undertekst>{props.aktivitet.arbeidssted}</Undertekst>
            </div>

        </div>

    </>)
}