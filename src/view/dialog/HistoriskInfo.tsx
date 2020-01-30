import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import styles from './HistoriskInfo.module.less';
import NyDialogLink from '../dialogliste/NyDialogLink';

interface Props {
    kanSendeMelding: boolean;
    hidden?: boolean;
}

function HistoriskInfo(props: Props) {
    if (props.hidden) {
        return null;
    }

    return (
        <div className={styles.historiskInfo}>
            <Normaltekst className={styles.historiskTekst}>
                Dette er en dialog fra en tidligere oppfølgingsperiode, og du kan derfor ikke svare på den.
            </Normaltekst>
            <NyDialogLink visible={props.kanSendeMelding} />
        </div>
    );
}

export default HistoriskInfo;
