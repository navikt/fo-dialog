import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { useDialogContext, useUserInfoContext } from '../Provider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import styles from './DialogInfoMelding.module.less';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';

export default function DialogInfoMelding() {
    const dialoger = useDialogContext();
    const bruker = useUserInfoContext();
    const harDialoger = hasData(dialoger) && dialoger.data.length > 0;

    return (
        <>
            <InfoVedIngenDialoger className={styles.info} visible={!bruker?.erVeileder && !harDialoger} />
            <DialogIkkeValgt className={styles.info} visible={harDialoger} />
        </>
    );
}
