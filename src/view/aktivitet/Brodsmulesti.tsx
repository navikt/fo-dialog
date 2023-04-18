import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import { AktivitetStatus, AlleAktivitetTypes } from '../../utils/aktivitetTypes';
import styles from './Aktivitetskort.module.less';
import { getStatusText, getTypeText } from './TextUtils';

interface Props {
    status: AktivitetStatus;
    type: AlleAktivitetTypes;
}

export default function Brodsmulesti(props: Props) {
    return (
        <div className={styles.brodsmulesti}>
            <BodyShort>
                aktivitet / {getStatusText(props.status)} / {getTypeText(props.type)}
            </BodyShort>
        </div>
    );
}
