import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { ReactComponent as DialogIcon } from './dialog.svg';

import './DialogBanner.less';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';

export function DialogBanner() {
    return (
        <div className="dialogbanner">
            <Lenke className="dialogbanner__lenke" href="https://www.nav.no/no/Ditt+NAV">
                <VenstreChevron />
                Ditt NAV
            </Lenke>

            <Sidetittel className="dialogbanner__tittel">
                <DialogIcon className="dialogbanner__ikon" />
                Dialog med veileder
            </Sidetittel>
        </div>
    );
}
