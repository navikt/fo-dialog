import React from 'react';
import { useUserInfoContext } from '../Provider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import styles from './DialogInfoMelding.module.less';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import { useDialogContext } from '../DialogProvider';

export default function DialogInfoMelding() {
    const { dialoger } = useDialogContext();
    const bruker = useUserInfoContext();
    const harDialoger = dialoger.length > 0;

    return (
        <>
            <InfoVedIngenDialoger className={styles.info} visible={!bruker?.erVeileder && !harDialoger} />
            <DialogIkkeValgt className={styles.info} visible={harDialoger} />
        </>
    );
}
