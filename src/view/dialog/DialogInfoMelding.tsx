import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { useDialogContext } from '../Provider';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import styles from './DialogInfoMelding.module.less';

export default function DialogInfoMelding() {
    const dialoger = useDialogContext();
    const harDialoger = hasData(dialoger) && dialoger.data.length > 0;

    return (
        <>
            <InfoVedIngenDialoger className={styles.info} visible={!harDialoger} />
            <DialogIkkeValgt className={styles.info} visible={harDialoger} />
        </>
    );
}
