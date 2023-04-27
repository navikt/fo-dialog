import React from 'react';

import { useDialogContext } from '../DialogProvider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';

const DialogInfoMelding = () => {
    const { dialoger } = useDialogContext();
    const harDialoger = dialoger.length > 0;

    return (
        <>
            <InfoVedIngenDialoger className={''} visible={!harDialoger} />
            <DialogIkkeValgt className={'hidden md:flex w-full'} visible={harDialoger} />
        </>
    );
};

export default DialogInfoMelding;
