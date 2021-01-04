import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

import styles from './TextArea.module.less';

interface TellerProps {
    maksTegn?: number;
    visTellerFra?: number;
    tegn?: number;
}

export function Teller(props: TellerProps) {
    const { maksTegn, tegn, visTellerFra } = props;
    const tilTegnIgjen = visTellerFra ? visTellerFra : 0;
    const lengde = tegn ? tegn : 0;
    if (maksTegn === undefined || maksTegn - lengde > tilTegnIgjen) {
        return null;
    }
    const igjen = maksTegn - lengde;
    const text = igjen >= 0 ? `Du har ${igjen} tegn igjen` : `Du har ${Math.abs(igjen)} tegn for mye`;

    return (
        <Normaltekst className={styles.teller} aria-live="polite">
            {text}
        </Normaltekst>
    );
}
