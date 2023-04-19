import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { useHistory } from 'react-router';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { useRoutes } from '../../routes';
import styles from './NyDialogLink.module.less';

const NyDialogLink = () => {
    const history = useHistory();
    const { nyRoute } = useRoutes();
    const goToNy = () => history.push(nyRoute());
    return (
        <div className={styles.header}>
            <Button variant="secondary" onClick={goToNy} icon={<PlusIcon />}>
                Ny dialog
            </Button>
        </div>
    );
};
export default visibleIfHoc(NyDialogLink);
