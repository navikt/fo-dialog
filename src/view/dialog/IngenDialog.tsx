import { Alert } from '@navikt/ds-react';
import React from 'react';

import styles from './Dialog.module.less';

export function IngenDialog() {
    return (
        <div className="m-4 flex flex-col flex-1 lg:max-w-lgContainer">
            <Alert variant="warning">Dialogen eksisterer ikke.</Alert>
        </div>
    );
}
