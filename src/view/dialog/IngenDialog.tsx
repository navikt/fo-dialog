import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';

import styles from './Dialog.module.less';

export function IngenDialog() {
    return (
        <div className={styles.dialog}>
            <AlertStripe className={styles.ingenDialog} type="advarsel">
                Dialogen eksisterer ikke.
            </AlertStripe>
        </div>
    );
}
