import React from 'react';
import { Aktivitet, DialogData } from '../utils/typer';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';

import useFetch from '../utils/use-fetch';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { ReactComponent as AktivitetsIkon } from './aktivitet_lest.svg';
import { formaterDate } from '../utils/date';
import Lenke from 'nav-frontend-lenker';

interface Props {
    dialog: DialogData;
}

export function AktivitetskortPreview(props: Props) {
    const aktiviteter = useFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet');
    if (aktiviteter.data !== null) {
        const aktivitet = aktiviteter.data.find(aktivitet => aktivitet.id === props.dialog.aktivitetId);
        //const datoString = !!props.dialog.sisteDato ? formaterDate(props.dialog.sisteDato) : '';

        if (aktivitet) {
            const info = mapAktivitetTypeToPreviw(aktivitet);
            return (
                <LenkepanelBase href={'fisk'} className="aktivitetskortpreview">
                    <AktivitetsIkon className="aktivitetskortpreview__ikon" />
                    <div className="aktivitetskortpreview__internal-div">
                        <div className="textdiv">
                            <Undertittel children={aktivitet.tittel} className="aktivitetskortpreview__info" />
                            <Undertekst children={info} className="aktivitetskortpreview__info" />
                        </div>
                        <Lenke
                            href={'aktivitetsplan'}
                            className="aktivitetskortpreview__les-mer"
                            children="Les mer i aktivitetsplanen"
                        />
                    </div>
                </LenkepanelBase>
            );
        }
    }
    return null;
}

function mapAktivitetTypeToPreviw(aktivitet: Aktivitet): string {
    switch (aktivitet.type) {
        case 'STILLING':
            return `Stilling | ${aktivitet.arbeidsgiver}`;
        case 'MOTE':
            return `Møte med NAV | ${formaterDate(aktivitet.fraDato)}`;
        case 'SOKEAVTALE':
            return `${formaterDate(aktivitet.fraDato)} - ${formaterDate(aktivitet.tilDato)}`;
        case 'BEHANDLING':
            return aktivitet.behandlingType!;
        case 'SAMTALEREFERAT':
            return `Samtalereferat | ${formaterDate(aktivitet.fraDato)}`;
        case 'EGEN':
            return `Jobbrettet egenaktivitet`;
        case 'IJOBB':
            return `Jobb jeg har nå | ${aktivitet.arbeidsgiver}`;
        case 'TILTAKSAKTIVITET':
            return 'Tiltak gjennom NAV';
        case 'GRUPPEAKTIVITET':
            return 'Gruppeaktivitet';
        case 'UTDANNING':
            return 'Utdanning';
    }

    return '';
}
