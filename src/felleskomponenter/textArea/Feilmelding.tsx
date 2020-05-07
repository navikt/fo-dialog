import { Normaltekst } from 'nav-frontend-typografi';
import styles from './TextArea.module.less';
import React from 'react';

export function Feilemelding(props: { feilmelding?: string; id: string }) {
    return (
        <div aria-live="polite" id={props.id}>
            {props.feilmelding && <Normaltekst className={styles.feilmelding}> {props.feilmelding} </Normaltekst>}
        </div>
    );
}
