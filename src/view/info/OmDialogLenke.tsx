import React from 'react';
import classNames from 'classnames';

// @ts-ignore
import Ikon from 'nav-frontend-ikoner-assets';
import { Link } from 'react-router-dom';

import styles from './OmDialogLenke.module.less';

function OmDialogLenke() {
    const knappCls = classNames('knapp knapp--flat knapp--kompakt knapp--mini', styles.omDialog);

    return (
        <Link to="/informasjon" className={knappCls}>
            <span>Om dialog</span>
            <Ikon kind="help-circle" />
        </Link>
    );
}

export default OmDialogLenke;
