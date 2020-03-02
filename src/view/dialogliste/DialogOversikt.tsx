import React from 'react';
import DialogOverviewHeader from './NyDialogLink';
import { useParams } from 'react-router';
import classNames from 'classnames';
import styles from './DialogOversikt.module.less';
import useKansendeMelding from '../../utils/UseKanSendeMelding';
import DialogListe from './DialogListe';
import OmDialogLenke from '../info/OmDialogLenke';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import { useDialogContext } from '../DialogProvider';

export function DialogOversikt() {
    const kanSendeMelding = useKansendeMelding();
    const { dialoger } = useDialogContext();
    const { dialogId } = useParams();

    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    return (
        <div className={visningCls}>
            <div className={styles.verktoylinje}>
                <DialogOverviewHeader visible={kanSendeMelding} />
                <OmDialogLenke />
            </div>
            <InfoVedIngenDialoger className={styles.info} visible={dialoger.length === 0} />
            <DialogListe />
        </div>
    );
}

export default DialogOversikt;
