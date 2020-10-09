import React from 'react';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { Link } from 'react-router-dom';
import { ReactComponent as PlussIkon } from './pluss.svg';
import styles from './NyDialogLink.module.less';

export function NyDialogLink() {
    return (
        <div className={styles.header}>
            <Link className={styles.dialogKnapp} to={'/ny'}>
                <PlussIkon className={styles.plusslogo} />
                Ny dialog
            </Link>
        </div>
    );
}

export default visibleIfHoc(NyDialogLink);
