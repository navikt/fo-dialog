import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import { formaterDateAndTime } from '../../utils/Date';
import { ReactComponent as Pil } from './pil.svg';

interface Props {
    tidspunkt: string;
}

function LestAvTidspunkt(props: Props) {
    const tidspunktMedRiktigFormat = formaterDateAndTime(props.tidspunkt);
    return (
        <div className="flex items-center justify-center pb-4 pt-2">
            <Pil className="mr-2" />
            <BodyShort>{`Lest av bruker ${tidspunktMedRiktigFormat}`}</BodyShort>
        </div>
    );
}

export default LestAvTidspunkt;
