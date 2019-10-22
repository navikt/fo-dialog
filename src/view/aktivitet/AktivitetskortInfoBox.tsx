import React from 'react';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/typer';
import { EtikettLiten, Undertekst } from 'nav-frontend-typografi';
import { formaterDate } from '../../utils/date';

import Lenke from 'nav-frontend-lenker';

interface Props {
    aktivitet: Aktivitet | ArenaAktivitet;
}

export function AktivitetskortInfoBox(props: Props) {
    const datapunkter: Array<InfoElement> = fjernTommeRaderOgKolonner(mapAktivietTypeToInfobox(props.aktivitet));

    return (
        <>
            {datapunkter.map(rad => (
                <div className='aktivitet-kort__infobox__row__item'>
                    <EtikettLiten children={rad.label} className="label" />
                    {rad.label === 'Lenke' ? <Lenke href={rad.data} children={rad.data} /> : <Undertekst children={rad.data} className="data" />}
                </div>
            ))}
        </>
    );
}

interface InfoElement {
    label: string;
    data: string;
}

type GridConfig = Array<InfoElement>;

function mapAktivietTypeToInfobox(aktivitet: Aktivitet | ArenaAktivitet): GridConfig {
    switch (aktivitet.type) {
        case AktivitetTypes.STILLING:
            return [
                { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                { label: 'Frist', data: formaterDate(aktivitet.tilDato) },
                { label: 'Arbeidsgiver', data: aktivitet.arbeidsgiver! },
                { label: 'Arbeidssted', data: aktivitet.arbeidssted! },
                { label: 'Beskrivelse', data: aktivitet.beskrivelse ? aktivitet.beskrivelse : '' },
                { label: 'Lenke', data: aktivitet.lenke ? aktivitet.lenke : '' }
            ];

        case AktivitetTypes.MOTE:
            return [
                { label: 'Dato', data: formaterDate(aktivitet.fraDato) },
                { label: 'Klokkeslett', data: '' },
                { label: 'Møteform', data: mapKanalToString(aktivitet.kanal!) },
                { label: 'Varighet', data: '' },
                { label: 'Møtested', data: aktivitet.adresse ? aktivitet.adresse : '' },
                { label: 'Hensikt med møtet', data: aktivitet.hensikt ? aktivitet.hensikt : '' },
                { label: 'Møtested', data: aktivitet.behandlingSted ? aktivitet.behandlingSted : '' }
            ];
        case AktivitetTypes.SOKEAVTALE:
            return [
                { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                { label: 'Til dato', data: formaterDate(aktivitet.tilDato) },
                { label: 'Antall søknader i perioden', data: aktivitet.antallStillingerSokes!.toString() },
                { label: 'Oppfølging fra nav', data: aktivitet.oppfolging! },
                { label: 'Beskrivelse', data: aktivitet.beskrivelse! }
            ];
        case AktivitetTypes.BEHANDLING:
            return [
                { label: 'Type behandling', data: aktivitet.behandlingType! },
                { label: 'Behandlingssted', data: aktivitet.behandlingSted! },
                { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                { label: 'Til dato', data: formaterDate(aktivitet.tilDato) },
                { label: 'Mål for behandlingen', data: aktivitet.effekt! },
                { label: 'Oppfølging fra NAV', data: aktivitet.oppfolging! },
                { label: 'Beskrivelse', data: aktivitet.beskrivelse! }
            ];
        case AktivitetTypes.SAMTALEREFERAT:
            return [
                { label: 'Dato', data: formaterDate(aktivitet.tilDato) },
                { label: 'Møteform', data: mapKanalToString(aktivitet.kanal!) },
                { label: 'Samtalereferat', data: aktivitet.referat! }
            ];

        case AktivitetTypes.EGEN:
            return [
                { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                { label: 'Til dato', data: formaterDate(aktivitet.tilDato) },
                { label: 'Mål med aktiviteten', data: aktivitet.hensikt! },
                { label: 'Min huskeliste', data: aktivitet.oppfolging! },
                { label: 'Beskrivelse', data: aktivitet.beskrivelse! },
                { label: 'Lenke', data: aktivitet.lenke! }
            ];
        case AktivitetTypes.IJOBB:
            return [
                { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                { label: 'Til dato', data: formaterDate(aktivitet.tilDato) },
                { label: 'Stillingsandel', data: aktivitet.jobbStatus! },
                { label: 'Arbeidsgiver', data: aktivitet.arbeidsgiver! },
                { label: 'Beskrivelse', data: aktivitet.beskrivelse! }
            ];
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return [
                { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                { label: 'Til dato', data: formaterDate(aktivitet.tilDato) },
                { label: 'Arrangør', data: aktivitet.arrangoer! },
                { label: 'Deltakelse', data: aktivitet.deltakelseProsent!.toString() },
                { label: 'Antall dager per uke', data: aktivitet.antallDagerPerUke!.toString() },
                { label: 'Beskrivelse', data: aktivitet.beskrivelse! }
            ];
    }

    return [];
}

function fjernTommeRaderOgKolonner(config: GridConfig): GridConfig {
    config = config.filter(row => row.data.length !== 0);

    return config;
}
function mapKanalToString(kanal: string) {
    switch (kanal) {
        case 'OPPMOTE':
            return 'Oppmøte';
        case 'TELEFON':
            return 'Telefonmøte';
        case 'INTERNETT':
            return 'Nettmøte';
    }
    return '';
}
