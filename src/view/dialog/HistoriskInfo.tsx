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
        <div className="flex flex-col justify-center items-center m-4 xl:self-center xl:max-w-max-paragraph">
            <BodyShort className="pb-8">
                Dette er en dialog fra en tidligere periode, og du kan derfor ikke svare på den.
            </BodyShort>
            <div className="self-start">
                <NyDialogLink visible={props.kanSendeMelding} />
            </div>
        </div>
    );
}

export default HistoriskInfo;
