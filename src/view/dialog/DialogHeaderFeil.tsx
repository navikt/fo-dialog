import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import styles from './DialogHeader.module.less';

interface Props {
    visible: boolean;
}

function DialogHeaderFeil(props: Props) {
    const { visible } = props;

    if (!visible) {
        return null;
    }

    return (
        <div className={styles.feil}>
            <AlertStripeFeil>
                Noe gikk galt, og du får dessverre ikke sett informasjon fra aktivitetsplanen. Prøv igjen senere.
            </AlertStripeFeil>
        </div>
    );
}

export default DialogHeaderFeil;
