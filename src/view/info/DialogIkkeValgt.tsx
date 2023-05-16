import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { ReactComponent as IngenValgteDialoger } from '../dialog/ingen-valgt.svg';

const DialogIkkeValgt = () => {
    return (
        <div className="flex flex-col justify-center">
            <IngenValgteDialoger className="w-40 mx-auto" />
            <BodyShort>Velg en dialog for å lese den</BodyShort>
        </div>
    );
};

export default visibleIfHoc(DialogIkkeValgt);
