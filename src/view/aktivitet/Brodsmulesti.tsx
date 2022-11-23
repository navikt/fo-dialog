import { Undertekst } from 'nav-frontend-typografi';
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
            <Undertekst>
                aktivitet / {getStatusText(props.status)} / {getTypeText(props.type)}
            </Undertekst>
        </div>
    );
}
