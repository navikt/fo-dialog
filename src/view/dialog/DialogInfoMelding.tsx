import React from 'react';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import styles from './DialogInfoMelding.module.less';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import { useDialogContext } from '../DialogProvider';

export default function DialogInfoMelding() {
    const { dialoger } = useDialogContext();
    const harDialoger = dialoger.length > 0;

    return (
        <>
            <InfoVedIngenDialoger className={styles.info} visible={!harDialoger} />
            <DialogIkkeValgt className={styles.info} visible={harDialoger} />
        </>
    );
}
