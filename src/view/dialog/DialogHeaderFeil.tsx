import { Alert } from '@navikt/ds-react';
import React from 'react';

import styles from './DialogHeader.module.less';

interface Props {
    visible: boolean;
}

function DialogHeaderFeil(props: Props) {
    const { visible } = props;

    if (!visible) {
        return null;
    }

    return (
        <div className="">
            <Alert fullWidth variant="error">
                Noe gikk galt, og du får dessverre ikke sett informasjon fra aktivitetsplanen. Prøv igjen senere.
            </Alert>
        </div>
    );
}

export default DialogHeaderFeil;
