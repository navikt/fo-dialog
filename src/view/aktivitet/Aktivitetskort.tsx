import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useParams } from 'react-router';

import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { useDialogContext } from '../DialogProvider';
import { useAktivitetId } from '../utils/useAktivitetId';
import { getAktivitetType } from '../utils/utils';
import AktivitetIngress from './AktivitetIngress';
import styles from './Aktivitetskort.module.less';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import AktivitetskortLenke from './AktivitetskortLenke';
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

    const { status, tittel, avtalt, id } = aktivitet;

    return (
        <section aria-label="Aktivitet knyttet til dialog" className="m-4">
            <AktivitetskortLenke aktivitetId={id} />
            <Brodsmulesti status={status} type={getAktivitetType(aktivitet)} />
            <Heading size="large" level="2">
                {tittel}
            </Heading>
            <AktivitetIngress aktivitetType={getAktivitetType(aktivitet)} />
            <AktivitetskortInfoBox aktivitet={aktivitet} />
            <AvtaltMarkering hidden={!avtalt} />
        </section>
    );
}
