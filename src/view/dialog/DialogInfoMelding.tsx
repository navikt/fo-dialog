import React from 'react';
import { hasData } from '@nutgaard/use-fetch';

import { useDialogContext } from '../Provider';
import { Normaltekst } from 'nav-frontend-typografi';
import InfoVedIngenDialoger from '../InfoVedIngenDialoger';
import { ReactComponent as IngenValgteDialoger } from './ingen-valgt.svg';
import styles from './DialogInfoMelding.module.less';

export default function DialogInfoMelding() {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];

    if (dialogData.length === 0) {
        return (
            <div className={styles.ingenDialoger}>
                <InfoVedIngenDialoger visible />
            </div>
        );
    }
    return (
        <div className={styles.dialogIkkeValgt}>
            <IngenValgteDialoger />
            <Normaltekst>Velg en dialog for å lese den</Normaltekst>
        </div>
    );
}
