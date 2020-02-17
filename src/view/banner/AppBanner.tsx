import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';

import './AppBanner.less';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import { useLocation } from 'react-router';
import classNames from 'classnames';

export function AppBanner(props: { hidden?: boolean }) {
    const location = useLocation();

    if (props.hidden) {
        return null;
    }

    const cls = classNames('dialogbanner', { 'hidden-xs': location.pathname !== '/' });
    return (
        <div className={cls}>
            <Lenke className="dialogbanner__lenke" href="https://www.nav.no/no/Ditt+NAV">
                <VenstreChevron />
                Ditt NAV
            </Lenke>

            <Sidetittel className="dialogbanner__tittel">Dialog med veilederen din</Sidetittel>
        </div>
    );
}
