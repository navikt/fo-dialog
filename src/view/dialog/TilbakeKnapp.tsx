import { ChevronLeftIcon } from '@navikt/aksel-icons';
import React from 'react';
import { Link } from 'react-router-dom';

import { useRoutes } from '../../routes';

interface Props {
    className?: string;
}

export const TilbakeKnapp = ({ className }: Props) => {
    const { baseRoute } = useRoutes();

    return (
        <Link to={baseRoute} title="Til dialoger" className={className}>
            <ChevronLeftIcon />
        </Link>
    );
};
