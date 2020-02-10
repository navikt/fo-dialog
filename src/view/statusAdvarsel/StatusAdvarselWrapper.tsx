import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import styles from './AlertLess.module.less';

export default function StatusAdvarselWrapper(props: { children: React.ReactNode }) {
    return (
        <div className={styles.alertstripeWrapper}>
            <AlertStripeAdvarsel>{props.children}</AlertStripeAdvarsel>
        </div>
    );
}

export function KanIkkeKonteteElektroniskVeileder() {
    return <StatusAdvarselWrapper>Du kan ikke kontakte denne brukeren elektronisk.</StatusAdvarselWrapper>;
}
