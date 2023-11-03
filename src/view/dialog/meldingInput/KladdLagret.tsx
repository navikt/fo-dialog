import { BodyShort } from '@navikt/ds-react';
import React, { useContext } from 'react';
import { MeldingInputContext } from './inputUtils';

const KladdLagret = () => {
    const { kladdErLagret } = useContext(MeldingInputContext);

    if (!kladdErLagret) return null;

    return (
        <BodyShort textColor="subtle" align="center" size="small">
            Kladd lagret
        </BodyShort>
    );
};

export default KladdLagret;
