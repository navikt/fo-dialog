import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';

import styles from './Dialog.module.less';
import { TittelHeader } from './DialogHeader';

export function IngenDialog() {
    return (
        <div className={styles.dialog}>
            <TittelHeader />
            <AlertStripe className={styles.ingenDialog} type="advarsel">
                Dialogen eksisterer ikke.
            </AlertStripe>
        </div>
    );
}
