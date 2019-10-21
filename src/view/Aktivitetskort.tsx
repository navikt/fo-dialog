import React from 'react';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes, DialogData } from '../utils/typer';
import { Element, EtikettLiten, Systemtittel } from 'nav-frontend-typografi';
import useFetch from '../utils/use-fetch';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import './Aktivitetskort.less';

interface PropTypes {
    dialog?: DialogData;
}

export function Aktivitetskort(props: PropTypes) {
    const { dialog } = props;
    const aktiviteter = useFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet').data;
    const arenaAktiviteter = useFetch<ArenaAktivitet[]>('/veilarbaktivitet/api/aktivitet/arena').data;

    if (dialog === undefined) {
        return null;
    }

    if (aktiviteter === null) {
        return null;
    }

    const aktivitet: Aktivitet | ArenaAktivitet | undefined =
        aktiviteter.find(aktivitet => aktivitet.id === dialog!.aktivitetId) ||
        arenaAktiviteter!.find(aktivitet => aktivitet.id === dialog!.aktivitetId);

    if (!aktivitet) {
        return null;
    }

    return (
        <div className="aktivitet-kort">
            <EtikettLiten className="aktivitet-kort__brødsmulesti">
                aktivitet / {aktivitet.status} / {mapAktivitetTypeToHumanReadableString(aktivitet.type)}
            </EtikettLiten>
            <Systemtittel>{aktivitet.tittel}</Systemtittel>
            <Element className="aktivitet-kort__link">
                <Lenke href={'temp'}>
                    Les mer i aktivitetsplanen
                    <HoyreChevron />
                </Lenke>
            </Element>
            <AktivitetskortInfoBox aktivitet={aktivitet} />
        </div>
    );
}

function mapAktivitetTypeToHumanReadableString(type: AktivitetTypes | ArenaAktivitetTypes) {
    switch (type) {
        case AktivitetTypes.MOTE:
            return 'Møte med NAV';
        case AktivitetTypes.STILLING:
            return 'Stilling';
        case AktivitetTypes.SOKEAVTALE:
            return 'Jobbsøking';
        case AktivitetTypes.SAMTALEREFERAT:
            return 'Samtalereferat';
        case AktivitetTypes.BEHANDLING:
            return 'Behandling';
        case AktivitetTypes.EGEN:
            return 'Egenaktivitet';
        case AktivitetTypes.IJOBB:
            return 'Nåværende stilling';
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return 'Tiltak gjennom NAV';
    }
    return '';
}
