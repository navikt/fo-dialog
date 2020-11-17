import React from 'react';

import { useDialogContext } from '../DialogProvider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import { useUserInfoContext } from '../Provider';
import styles from './DialogInfoMelding.module.less';

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
