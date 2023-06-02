import { Alert } from '@navikt/ds-react';
import React from 'react';

import styles from './Dialog.module.less';

export function IngenDialog() {
    return (
        <div className="m-4 flex flex-1 flex-col lg:max-w-lgContainer">
            <Alert variant="warning">Dialogen eksisterer ikke.</Alert>
        </div>
    );
}
