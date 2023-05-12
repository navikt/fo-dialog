import { Detail } from '@navikt/ds-react';
import React from 'react';

import { AktivitetStatus, AlleAktivitetTypes } from '../../utils/aktivitetTypes';
import { getStatusText, getTypeText } from './TextUtils';

interface Props {
    status: AktivitetStatus;
    type: AlleAktivitetTypes;
}

export default function Brodsmulesti(props: Props) {
    return (
        <div className="uppercase text-text-default">
            <Detail>
                {getStatusText(props.status)} / {getTypeText(props.type)}
            </Detail>
        </div>
    );
}
