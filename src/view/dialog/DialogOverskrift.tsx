import { Heading } from '@navikt/ds-react';
import React from 'react';

import { StringOrNull } from '../../utils/Typer';
import { dialogHeaderID2 } from './DialogHeader';
import styles from './DialogHeader.module.less';

interface DialogOverskriftProps {
    tekst?: StringOrNull;
}

export const DialogOverskrift = (props: DialogOverskriftProps) =>
    props.tekst ? (
        <Heading id={dialogHeaderID2} className={styles.tittel}>
            {props.tekst}
        </Heading>
    ) : null;
