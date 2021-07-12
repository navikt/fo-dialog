import React from 'react';
import { Link } from 'react-router-dom';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import styles from './NyDialogLink.module.less';
import { ReactComponent as PlussIkon } from './pluss.svg';

const NyDialogLink = () => {
    return (
        <div className={styles.header}>
            <Link className={styles.dialogKnapp} to={'/ny'}>
                <PlussIkon className={styles.plusslogo} />
                Ny dialog
            </Link>
        </div>
    );
};
export default visibleIfHoc(NyDialogLink);
