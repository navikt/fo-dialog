import React from 'react';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import { Aktivitetskort } from './Aktivitetskort';
import { hasData } from '@nutgaard/use-fetch';
import styles from './AktivitetContainer.module.less';

function AktivitetContainer() {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    return (
        <div className={styles.aktivitetContainer}>{valgtDialog ? <Aktivitetskort dialog={valgtDialog} /> : null}</div>
    );
}

export default AktivitetContainer;
