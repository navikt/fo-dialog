import React from 'react';
import { DialogData } from '../../utils/Typer';
import { Aktivitet, ArenaAktivitet } from '../../utils/AktivitetTypes';

import { Element, EtikettLiten, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import UseFetch from '../../utils/UseFetch';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import styles from './Aktivitetskort.module.less';
import { getAktivitetIngress, getStatusText, getTypeText } from './TextUtils';

interface PropTypes {
    dialog?: DialogData;
}

export const aktivitetLenke = (aktivitetId: string) => `/aktivitetsplan/aktivitet/vis/${aktivitetId}`;

export function Aktivitetskort(props: PropTypes) {
    const { dialog } = props;
    const aktiviteter = UseFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet').data;
    const arenaAktiviteter = UseFetch<ArenaAktivitet[]>('/veilarbaktivitet/api/aktivitet/arena').data;

    if (!aktiviteter && !arenaAktiviteter) {
        return null;
    }

    const aktivitet =
        (aktiviteter && aktiviteter.find(aktivitet => aktivitet.id === dialog!.aktivitetId)) ||
        (arenaAktiviteter && arenaAktiviteter.find(aktivitet => aktivitet.id === dialog!.aktivitetId));

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
            <Undertekst className={styles.undertekst}>{getAktivitetIngress(aktivitet.type)}</Undertekst>
            <AktivitetskortInfoBox aktivitet={aktivitet} />
        </div>
    );
}
