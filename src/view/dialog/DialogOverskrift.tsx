import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';

import { StringOrNull } from '../../utils/Typer';
import { dialogHeaderID2 } from './DialogHeader';
import styles from './DialogHeader.module.less';

interface DialogOverskriftProps {
    tekst?: StringOrNull;
}

export const DialogOverskrift = (props: DialogOverskriftProps) =>
    props.tekst ? (
        <Undertittel id={dialogHeaderID2} className={styles.tittel}>
            {props.tekst}
        </Undertittel>
    ) : null;
