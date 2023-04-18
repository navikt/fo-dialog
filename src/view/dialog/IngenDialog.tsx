import { Alert } from '@navikt/ds-react';
import React from 'react';

import styles from './Dialog.module.less';

export function IngenDialog() {
    return (
        <div className={styles.dialog}>
            <Alert variant="error">Dialogen eksisterer ikke.</Alert>
        </div>
    );
}
