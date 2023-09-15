import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router';

import { useRoutes } from '../../routes';

const NyDialogLink = () => {
    const navigate = useNavigate();
    const { nyRoute } = useRoutes();
    const goToNy = () => navigate(nyRoute());
    return (
        <Button className="flex-grow" size="small" onClick={goToNy} icon={<PlusIcon aria-hidden />}>
            Ny dialog
        </Button>
    );
};
export default NyDialogLink;
