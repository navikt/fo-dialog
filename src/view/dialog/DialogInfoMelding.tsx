import React from 'react';

import { useDialogContext } from '../DialogProvider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';

const DialogInfoMelding = () => {
    const { dialoger } = useDialogContext();
    const harDialoger = dialoger.length > 0;

    return (
        <div className="hidden w-full justify-center border-r border-border-divider bg-gray-100 pt-8 md:flex lg:max-w-lgContainer xl:max-w-none">
            {harDialoger ? <DialogIkkeValgt /> : <InfoVedIngenDialoger />}
        </div>
    );
};

export default DialogInfoMelding;
