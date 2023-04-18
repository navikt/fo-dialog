import { QuestionmarkIcon } from '@navikt/aksel-icons';
import React from 'react';
import { Link } from 'react-router-dom';

import { useRoutes } from '../../routes';

function OmDialogLenke() {
    const { informasjonRoute } = useRoutes();
    return (
        <Link to={informasjonRoute()}>
            <span className="flex">
                <span>Om dialog</span>
                <QuestionmarkIcon className="w-6 h-6" />
            </span>
        </Link>
    );
}

export default OmDialogLenke;
