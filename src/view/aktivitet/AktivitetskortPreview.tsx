import React from 'react';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes, DialogData } from '../../utils/typer';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';

import useFetch from '../../utils/use-fetch';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { formaterDate } from '../../utils/date';
import Lenke from 'nav-frontend-lenker';

interface Props {
    dialog: DialogData;
}

export function AktivitetskortPreview(props: Props) {
    const aktiviteter = useFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet');
    if (aktiviteter.data !== null) {
        const aktivitet = aktiviteter.data.find(aktivitet => aktivitet.id === props.dialog.aktivitetId);

        if (aktivitet) {
            const info = mapAktivitetTypeToPreview(aktivitet);
            return (
                <LenkepanelBase href={'fisk'} className="aktivitetskortpreview">
                    <div className="aktivitetskortpreview__internal-div">
                        <div className="textdiv">
                            <Undertittel children={aktivitet.tittel} className="aktivitetskortpreview__info" />
                            <Undertekst children={info} className="aktivitetskortpreview__info" />
                        </div>
                        <Lenke href={'aktivitetsplan'} className="aktivitetskortpreview__les-mer" children="Les mer" />
                    </div>
                </LenkepanelBase>
            );
        }
    }
    return null;
}

function mapAktivitetTypeToPreview(aktivitet: Aktivitet | ArenaAktivitet): string {
    switch (aktivitet.type) {
        case AktivitetTypes.STILLING:
            return `Stilling | ${aktivitet.arbeidsgiver}`;
        case AktivitetTypes.MOTE:
            return `Møte med NAV | ${formaterDate(aktivitet.fraDato)}`;
        case AktivitetTypes.SOKEAVTALE:
            return `${formaterDate(aktivitet.fraDato)} - ${formaterDate(aktivitet.tilDato)}`;
        case AktivitetTypes.BEHANDLING:
            return aktivitet.behandlingType!;
        case AktivitetTypes.SAMTALEREFERAT:
            return `Samtalereferat | ${formaterDate(aktivitet.fraDato)}`;
        case AktivitetTypes.EGEN:
            return `Jobbrettet egenaktivitet`;
        case AktivitetTypes.IJOBB:
            return `Jobb jeg har nå | ${aktivitet.arbeidsgiver}`;
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return 'Tiltak gjennom NAV';
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return 'Gruppeaktivitet';
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
            return 'Utdanning';
    }

    return '';
}
