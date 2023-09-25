import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router';

import { useRoutes } from '../../routes';
import { useCompactMode } from '../../featureToggle/FeatureToggleProvider';

const NyDialogLink = () => {
    const compactMode = useCompactMode();
    const navigate = useNavigate();
    const { nyRoute } = useRoutes();
    const goToNy = () => navigate(nyRoute());
    return (
        <Button
            className={classNames({ 'flex-grow': compactMode, 'w-full': !compactMode })}
            size={compactMode ? 'small' : 'medium'}
            onClick={goToNy}
            icon={<PlusIcon aria-hidden />}
        >
            Ny dialog
        </Button>
    );
};
export default NyDialogLink;
