import React from 'react';

import { Aktivitetskort } from '../aktivitet/Aktivitetskort';
import { useDialogContext } from '../DialogProvider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';

const DialogInfoMelding = () => {
    const { dialoger } = useDialogContext();
    const harDialoger = dialoger.length > 0;

    return (
        <div className="bg-gray-100 border-r border-border-divider w-full md:flex justify-center hidden pt-8 lg:max-w-lgContainer xl:max-w-none">
            <InfoVedIngenDialoger visible={!harDialoger} />
            <DialogIkkeValgt visible={harDialoger} />
        </div>
    );
};

export default DialogInfoMelding;
