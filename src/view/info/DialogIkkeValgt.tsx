import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import IngenValgteDialoger from '../dialog/ingen-valgt.svg?react';

const DialogIkkeValgt = () => {
    return (
        <div className="flex flex-col justify-center">
            <IngenValgteDialoger className="mx-auto w-40" />
            <BodyShort>Velg en dialog for å lese den</BodyShort>
        </div>
    );
};

export default DialogIkkeValgt;
