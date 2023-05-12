import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { formaterDateAndTime } from '../../utils/Date';
import { ReactComponent as Pil } from './pil.svg';

interface Props {
    tidspunkt: string;
}

function LestAvTidspunkt(props: Props) {
    const tidspunktMedRiktigFormat = formaterDateAndTime(props.tidspunkt);
    return (
        <div className="flex pt-2 pb-4 justify-center items-center text-gray-600">
            <Pil className="mr-2 fill-gray-600" />
            <BodyShort>{`Lest av bruker ${tidspunktMedRiktigFormat}`}</BodyShort>
        </div>
    );
}

export default visibleIfHoc(LestAvTidspunkt);
