import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { useHistory } from 'react-router';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { useRoutes } from '../../routes';

const NyDialogLink = () => {
    const history = useHistory();
    const { nyRoute } = useRoutes();
    const goToNy = () => history.push(nyRoute());
    return (
        <Button className="w-full" onClick={goToNy} icon={<PlusIcon />}>
            Start en ny dialog
        </Button>
    );
};
export default visibleIfHoc(NyDialogLink);
