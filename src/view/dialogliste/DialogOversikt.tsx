import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import classNames from 'classnames';
import styles from './DialogOversikt.module.less';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import DialogListe from './DialogListe';

export function DialogOversikt() {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();

    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    return (
        <div className={visningCls}>
            <DialogListe />
            <InfoVedIngenDialoger className={styles.info} visible={dialogData.length === 0} />
        </div>
    );
}

export default DialogOversikt;
