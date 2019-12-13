import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { ReactComponent as DialogIcon } from '../../fellesikoner/snakkebobler.svg';

import './AppBanner.less';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';

export function AppBanner(props: { hidden?: boolean }) {
    if (props.hidden) {
        return null;
    }

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
