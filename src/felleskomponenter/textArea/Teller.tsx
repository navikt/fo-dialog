import { Normaltekst } from 'nav-frontend-typografi';
import styles from './TextArea.module.less';
import React from 'react';

interface TellerProps {
    maksTegn?: number;
    visTellerFra?: number;
    tegn?: number;
    id: string;
}

export function Teller(props: TellerProps) {
    const { maksTegn, tegn, visTellerFra, id } = props;
    const tilTegnIgjen = visTellerFra ? visTellerFra : 0;
    const lengde = tegn ? tegn : 0;
    if (maksTegn === undefined || maksTegn - lengde > tilTegnIgjen) {
        return null;
    }
    const igjen = maksTegn - lengde;
    const text = igjen >= 0 ? `Du har ${igjen} tegn igjen` : `Du har ${Math.abs(igjen)} tegn for mye`;

    return (
        <Normaltekst className={styles.teller} aria-live="polite" id={id}>
            {text}
        </Normaltekst>
    );
}
