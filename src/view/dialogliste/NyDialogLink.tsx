import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { Link } from 'react-router-dom';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import styles from './NyDialogLink.module.less';
import { ReactComponent as PlussIkon } from './pluss.svg';

const NyDialogLink = () => (
    <div className={styles.header}>
        <Link to={'/ny'} className={styles.dialogKnapp}>
            <Hovedknapp kompakt>
                <PlussIkon className={styles.plusslogo} />
                <span>Ny dialog</span>
            </Hovedknapp>
        </Link>
    </div>
);

export default visibleIfHoc(NyDialogLink);
