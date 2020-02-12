import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import DialogOverviewHeader from './NyDialogLink';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import classNames from 'classnames';
import styles from './DialogOversikt.module.less';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import DialogListe from './DialogListe';
import OmDialogLenke from '../info/OmDialogLenke';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';

export function DialogOversikt() {
    const kanSendeMelding = useKansendeMelding();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();

    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    return (
        <div className={visningCls}>
            <div className={styles.verktoylinje}>
                <DialogOverviewHeader visible={kanSendeMelding} />
                <OmDialogLenke />
            </div>
            <InfoVedIngenDialoger className={styles.info} visible={dialogData.length === 0} />
            <DialogListe />
        </div>
    );
}

export default DialogOversikt;
