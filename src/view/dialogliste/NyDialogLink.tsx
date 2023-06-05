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
        <Button className="w-full" onClick={goToNy} icon={<PlusIcon aria-hidden />}>
            Start en ny dialog
        </Button>
    );
};
export default NyDialogLink;
