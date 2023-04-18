import { Alert } from '@navikt/ds-react';
import React from 'react';

import styles from './AlertLess.module.less';

export default function StatusAdvarselWrapper(props: { children: React.ReactNode }) {
    return (
        <div className={styles.alertstripeWrapper}>
            <Alert variant="error">{props.children}</Alert>
        </div>
    );
}

export function KanIkkeKontakteElektroniskVeileder() {
    return <StatusAdvarselWrapper>Du kan ikke kontakte denne brukeren elektronisk.</StatusAdvarselWrapper>;
}
