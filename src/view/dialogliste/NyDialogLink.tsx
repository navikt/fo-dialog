import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useHistory } from 'react-router';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import styles from './NyDialogLink.module.less';
import { ReactComponent as PlussIkon } from './pluss.svg';

const NyDialogLink = () => {
    const history = useHistory();

    return (
        <div className={styles.header}>
            <Hovedknapp kompakt onClick={() => history.push('/ny')}>
                <PlussIkon className={styles.plusslogo} />
                <span>Ny dialog</span>
            </Hovedknapp>
        </div>
    );
};
export default visibleIfHoc(NyDialogLink);
