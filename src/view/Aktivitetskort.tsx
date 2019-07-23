import React from 'react';
import { Aktivitet, DialogData } from '../utils/typer';
import { EtikettLiten, Element, Systemtittel } from 'nav-frontend-typografi';
import useFetch from '../utils/use-fetch';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';

interface Props {
    dialog: DialogData;
}

export function Aktivitetskort(props: Props) {
    const aktiviteter = useFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet');

    if (aktiviteter.data !== null) {
        const aktivitet = aktiviteter.data.find(aktivitet => aktivitet.id === props.dialog.aktivitetId);

        if (aktivitet) {
            return (
                <div className="aktivitetkort">
                    <EtikettLiten className="aktivitetkort__brødsmulesti">
                        aktivitet / {aktivitet.status} / {mapAktivitetTypeToHumanReadableString(aktivitet.type)}
                    </EtikettLiten>
                    <Systemtittel>{aktivitet.tittel}</Systemtittel>
                    <Element className="aktivitetkort__link">
                        <Lenke href={'temp'}>
                            Les mer i aktivitetsplanen
                            <HoyreChevron />
                        </Lenke>
                    </Element>
                    <AktivitetskortInfoBox aktivitet={aktivitet} />
                </div>
            );
        }
    }
    return null;
}

function mapAktivitetTypeToHumanReadableString(type: string) {
    switch (type) {
        case 'MOTE':
            return 'Møte med NAV';
        case 'STILLING':
            return 'Stilling';
        case 'SOKEAVTALE':
            return 'Jobbsøking';
        case 'SAMTALEREFERAT':
            return 'Samtalereferat';
        case 'BEHANDLING':
            return 'Behandling';
        case 'EGEN':
            return 'Egenaktivitet';
        case 'IJOBB':
            return 'Nåværende stilling';
        case 'TILTAKSAKTIVITET':
            return 'Tiltak gjennom NAV';
    }
    return '';
}
