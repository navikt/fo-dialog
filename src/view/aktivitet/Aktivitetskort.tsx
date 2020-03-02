import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import styles from './Aktivitetskort.module.less';
import { useParams } from 'react-router';
import Brodsmulesti from './Brodsmulesti';
import AktivitetskortLenke from './AktivitetskortLinke';
import AktivitetIngress from './AktivitetIngress';
import AvtaltMarkering from './etiketter/avtalt-markering';
import { useAktivitetId } from '../utils/useAktivitetId';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { useDialogContext } from '../DialogProvider';

export function Aktivitetskort() {
    const { dialoger } = useDialogContext();
    const { dialogId } = useParams();
    const aktivitetData = useAktivitetContext();

    const dialog = dialoger.find(dialog => dialog.id === dialogId);
    const aktivitetId = useAktivitetId() ?? dialog?.aktivitetId;
    const aktivitet = findAktivitet(aktivitetData, aktivitetId);

    if (!aktivitet) {
        return null;
    }

    const { status, tittel, type, avtalt, id } = aktivitet;

    return (
        <div className={styles.aktivitetskort}>
            <Brodsmulesti status={status} type={type} />
            <Systemtittel>{tittel}</Systemtittel>
            <AktivitetskortLenke aktivitetId={id} />
            <AktivitetIngress aktivitetType={type} />
            <AktivitetskortInfoBox aktivitet={aktivitet} />
            <AvtaltMarkering hidden={!avtalt} />
        </div>
    );
}
