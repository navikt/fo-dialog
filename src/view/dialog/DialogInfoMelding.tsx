import React from 'react';

import { useDialogContext } from '../DialogProvider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';
import styles from './DialogInfoMelding.module.less';

const DialogInfoMelding = () => {
    const { dialoger } = useDialogContext();
    const harDialoger = dialoger.length > 0;

    return (
        <>
            <InfoVedIngenDialoger className={styles.info} visible={!harDialoger} />
            <DialogIkkeValgt className={styles.info} visible={harDialoger} />
        </>
    );
};

export default DialogInfoMelding;
