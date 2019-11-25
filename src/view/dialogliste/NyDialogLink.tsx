import React from 'react';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { Link } from 'react-router-dom';
import { ReactComponent as PlussIkon } from './pluss.svg';
import styles from './NyDialogLink.module.less';
import classNames from 'classnames';

export function NyDialogLink() {
    const knappCls = classNames(styles.knapp, 'knapp--flat', 'knapp');
    return (
        <div className={styles.header}>
            <div className={styles.panel}>
                <Link className={knappCls} to={'/ny'}>
                    <PlussIkon />
                    Ny dialog
                </Link>
            </div>
        </div>
    );
}

export default visibleIfHoc(NyDialogLink);
