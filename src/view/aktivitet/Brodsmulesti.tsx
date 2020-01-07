import styles from './Aktivitetskort.module.less';
import { getStatusText, getTypeText } from './TextUtils';
import { EtikettLiten } from 'nav-frontend-typografi';
import React from 'react';
import { AktivitetStatus, AktivitetTypes, ArenaAktivitetTypes } from '../../utils/AktivitetTypes';

interface Props {
    status: AktivitetStatus;
    type: AktivitetTypes | ArenaAktivitetTypes;
}

export default function Brodsmulesti(props: Props) {
    return (
        <div className={styles.brodsmulesti}>
            <EtikettLiten>
                aktivitet / {getStatusText(props.status)} / {getTypeText(props.type)}
            </EtikettLiten>
        </div>
    );
}
