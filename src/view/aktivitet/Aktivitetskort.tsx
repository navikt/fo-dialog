import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { useParams } from 'react-router';

import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { useDialogContext } from '../DialogProvider';
import { useAktivitetId } from '../utils/useAktivitetId';
import AktivitetIngress from './AktivitetIngress';
import styles from './Aktivitetskort.module.less';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import AktivitetskortLenke from './AktivitetskortLinke';
import Brodsmulesti from './Brodsmulesti';
import AvtaltMarkering from './etiketter/avtalt-markering';

export function Aktivitetskort() {
    const { dialoger } = useDialogContext();
    const { dialogId } = useParams();
    const aktivitetData = useAktivitetContext();

    const dialog = dialoger.find((dialog) => dialog.id === dialogId);
    const aktivitetId = useAktivitetId() ?? dialog?.aktivitetId;
    const aktivitet = findAktivitet(aktivitetData, aktivitetId);

    if (!aktivitet) {
        return null;
    }

    const { status, tittel, type, avtalt, id } = aktivitet;

    return (
        <section aria-label="Aktivitet knyttet til dialog" className={styles.aktivitetskort}>
            <Systemtittel className="visually-hidden">Aktivitet knyttet til dialog</Systemtittel>
            <AktivitetskortLenke aktivitetId={id} />
            <Brodsmulesti status={status} type={type} />
            <Systemtittel>{tittel}</Systemtittel>
            <AktivitetIngress aktivitetType={type} />
            <AktivitetskortInfoBox aktivitet={aktivitet} />
            <AvtaltMarkering hidden={!avtalt} />
        </section>
    );
}
