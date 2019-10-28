import React from 'react';
import { DialogData } from '../../utils/Typer';
import {
    Aktivitet,
    AktivitetStatus,
    AktivitetTypes,
    ArenaAktivitet,
    ArenaAktivitetTypes
} from '../../utils/AktivitetTypes';

import { Element, EtikettLiten, Systemtittel } from 'nav-frontend-typografi';
import UseFetch from '../../utils/UseFetch';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import styles from './Aktivitetskort.module.less';

interface PropTypes {
    dialog?: DialogData;
}

export const aktivitetLenke = (aktivitetId: string) => `/aktivitetsplan/aktivitet/vis/${aktivitetId}`;

export function Aktivitetskort(props: PropTypes) {
    const { dialog } = props;
    const aktiviteter = UseFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet').data;
    const arenaAktiviteter = UseFetch<ArenaAktivitet[]>('/veilarbaktivitet/api/aktivitet/arena').data;

    if (!dialog) {
        return null;
    }

    if (!aktiviteter) {
        return null;
    }

    const aktivitet =
        aktiviteter.find(aktivitet => aktivitet.id === dialog!.aktivitetId) ||
        arenaAktiviteter!.find(aktivitet => aktivitet.id === dialog!.aktivitetId);

    if (!aktivitet) {
        return null;
    }

    return (
        <div className={styles.aktivitetskort}>
            <EtikettLiten className={styles.brodsmulesti}>
                aktivitet / {getStatusText(aktivitet.status)} / {getTypeText(aktivitet.type)}
            </EtikettLiten>
            <Systemtittel>{aktivitet.tittel}</Systemtittel>
            <Element className={styles.aktivitetkortlenke}>
                <Lenke href={aktivitetLenke(aktivitet.id)}>
                    Les mer i aktivitetsplanen
                    <HoyreChevron />
                </Lenke>
            </Element>
            <AktivitetskortInfoBox aktivitet={aktivitet} />
        </div>
    );
}

function getStatusText(status: AktivitetStatus) {
    switch (status) {
        case AktivitetStatus.PLANLAGT:
            return 'Planlegger';
        case AktivitetStatus.GJENNOMFORES:
            return 'Gjennomfører';
        case AktivitetStatus.FULLFORT:
            return 'Fullført';
        case AktivitetStatus.BRUKER_ER_INTERESSERT:
            return 'Forslag';
        case AktivitetStatus.AVBRUTT:
            return 'Avbrutt';
    }
}

function getTypeText(type: AktivitetTypes | ArenaAktivitetTypes) {
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
            return 'Jobbrettet egenaktivitet';
        case AktivitetTypes.IJOBB:
            return 'Jobb jeg har nå';
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return 'Tiltak gjennom NAV';
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return 'Gruppeaktivitet';
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
            return 'Utdanningsaktivitet';
    }
    return '';
}
