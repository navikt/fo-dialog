import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import NyDialogLink from '../dialogliste/NyDialogLink';
import styles from './HistoriskInfo.module.less';

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
            <BodyShort className={styles.historiskTekst}>
                Dette er en dialog fra en tidligere periode, og du kan derfor ikke svare på den.
            </BodyShort>
            <NyDialogLink visible={props.kanSendeMelding} />
        </div>
    );
}

export default HistoriskInfo;
