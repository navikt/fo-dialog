import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';

import { StringOrNull } from '../../utils/Typer';
import { dialogHeaderID2 } from './DialogHeader';
import styles from './DialogHeader.module.less';

interface DialogOverskriftProps {
    tekst?: StringOrNull;
}

export function DialogOverskrift(props: DialogOverskriftProps) {
    if (!props.tekst) {
        return null;
    }

    return (
        <Undertittel id={dialogHeaderID2} className={styles.tittel}>
            {props.tekst}
        </Undertittel>
    );
}
