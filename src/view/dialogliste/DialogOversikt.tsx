import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import DialogOverviewHeader from './NyDialogLink';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import classNames from 'classnames';
import styles from './DialogOversikt.module.less';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import DialogListe from './DialogListe';

export function DialogOversikt() {
    const kanSendeMelding = useKansendeMelding();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();

    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    return (
        <div className={visningCls}>
            <DialogOverviewHeader visible={kanSendeMelding} />
            <InfoVedIngenDialoger uniqueName="oversikt" className={styles.info} visible={dialogData.length === 0} />
            <DialogListe />
        </div>
    );
}

export default DialogOversikt;
