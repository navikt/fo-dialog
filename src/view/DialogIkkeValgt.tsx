import styles from './DialogIkkeValgt.module.less';
import { ReactComponent as IngenValgteDialoger } from './dialog/ingen-valgt.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { visibleIfHoc } from '../felleskomponenter/VisibleIfHoc';
import { VisibleIfDeviceHoc } from '../felleskomponenter/VisibleIfDeviceHoc';

function DialogIkkeValgt() {
    return (
        <div className={styles.dialogIkkeValgt}>
            <IngenValgteDialoger />
            <Normaltekst>Velg en dialog for å lese den</Normaltekst>
        </div>
    );
}

const visibleIf = visibleIfHoc(DialogIkkeValgt);
export default VisibleIfDeviceHoc(visibleIf);
