import React from 'react';

import { useDialogContext } from '../DialogProvider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';

const DialogInfoMelding = () => {
    const { dialoger } = useDialogContext();
    const harDialoger = dialoger.length > 0;

    return (
        <div className="w-full md:flex items-center justify-center hidden p-4">
            <InfoVedIngenDialoger visible={!harDialoger} />
            <DialogIkkeValgt visible={harDialoger} />
        </div>
    );
};

export default DialogInfoMelding;
