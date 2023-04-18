import { Button } from '@navikt/ds-react';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { useRoutes } from '../../routes';
import styles from './NyDialogLink.module.less';
import { ReactComponent as PlussIkon } from './pluss.svg';

const NyDialogLink = () => {
    const history = useHistory();
    const { nyRoute } = useRoutes();
    const goToNy = () => history.push(nyRoute());
    return (
        <div className={styles.header}>
            <Button
                onClick={goToNy}
                icon={<PlussIkon className="text-white" />}
                // to={'/ny'}
            >
                Ny dialog
            </Button>
        </div>
    );
};
export default visibleIfHoc(NyDialogLink);
