import classNames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { ReactComponent as IngenValgteDialoger } from '../dialog/ingen-valgt.svg';
import styles from './DialogIkkeValgt.module.less';

interface Props {
    className: string;
}

function DialogIkkeValgt(props: Props) {
    return (
        <div className={classNames(props.className, styles.dialogIkkeValgt)}>
            <IngenValgteDialoger />
            <Normaltekst>Velg en dialog for å lese den</Normaltekst>
        </div>
    );
}

export default visibleIfHoc(DialogIkkeValgt);
