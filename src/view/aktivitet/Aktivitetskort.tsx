import React from 'react';
import { Element, EtikettLiten, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import { hasData } from '@nutgaard/use-fetch';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import styles from './Aktivitetskort.module.less';
import { getAktivitetIngress, getStatusText, getTypeText } from './TextUtils';
import { useParams } from 'react-router';
import { useDialogContext } from '../Provider';
import { useFindAktivitet } from '../../api/UseAktivitet';

export const aktivitetLenke = (aktivitetId: string) => `/aktivitetsplan/aktivitet/vis/${aktivitetId}`;

export function Aktivitetskort() {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const findAktivitet = useFindAktivitet();

    const dialog = dialogData.find(dialog => dialog.id === dialogId);

    const aktivitet = dialog && findAktivitet(dialog.aktivitetId);

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
