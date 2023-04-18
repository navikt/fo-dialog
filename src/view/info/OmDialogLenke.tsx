import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './OmDialogLenke.module.less';

function OmDialogLenke() {
    const knappCls = classNames('knapp knapp--flat knapp--kompakt knapp--mini', styles.omDialog);

    return (
        <Link to="/informasjon" className={knappCls}>
            <span>Om dialog</span>
        </Link>
    );
}

export default OmDialogLenke;
