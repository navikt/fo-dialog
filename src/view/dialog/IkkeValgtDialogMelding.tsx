import React from 'react';

import { useDialoger } from '../DialogProvider';
import DialogIkkeValgt from '../info/DialogIkkeValgt';
import InfoVedIngenDialoger from '../info/InfoVedIngenDialoger';

const IkkeValgtDialogMelding = () => {
    const dialoger = useDialoger();
    const harDialoger = dialoger.length > 0;

    return (
        <div className="hidden w-full justify-center border-r border-border-divider bg-gray-100 pt-8 md:flex lg:max-w-lgContainer xl:max-w-none">
            {harDialoger ? <DialogIkkeValgt /> : <InfoVedIngenDialoger />}
        </div>
    );
};

export default IkkeValgtDialogMelding;
