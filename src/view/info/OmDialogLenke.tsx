import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import React from 'react';
import { useHistory } from 'react-router';

import { useRoutes } from '../../routes';

function OmDialogLenke() {
    const { informasjonRoute } = useRoutes();
    const history = useHistory();
    const gotoInformasjon = () => history.push(informasjonRoute());
    return (
        <Link onClick={gotoInformasjon} href={informasjonRoute()}>
            Om dialog
        </Link>
    );
}

export default OmDialogLenke;
