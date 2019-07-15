import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { ReactComponent as DialogIcon } from './dialog.svg';

import './DialogBanner.less';

export function DialogBanner() {
    //legg til dialogbanner--dialogvisning i classname til dfor visning av dialog
    return (
        <div className="dialogbanner ">
            <DialogIcon className="dialogbanner__ikon" />
            <Sidetittel>Dialog med din veileder</Sidetittel>
        </div>
    );
}
