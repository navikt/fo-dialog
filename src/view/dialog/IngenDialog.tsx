import React from 'react';
import { TittelHeader } from './DialogHeader';
import AlertStripe from 'nav-frontend-alertstriper';
import styles from './Dialog.module.less';

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
