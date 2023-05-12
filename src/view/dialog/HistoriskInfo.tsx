import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import NyDialogLink from '../dialogliste/NyDialogLink';

interface Props {
    kanSendeMelding: boolean;
    hidden?: boolean;
}

function HistoriskInfo(props: Props) {
    if (props.hidden) {
        return null;
    }

    return (
        <div className="flex flex-col justify-center items-center m-4">
            <BodyShort className="pb-8">
                Dette er en dialog fra en tidligere periode, og du kan derfor ikke svare på den.
            </BodyShort>
            <NyDialogLink visible={props.kanSendeMelding} />
        </div>
    );
}

export default HistoriskInfo;
