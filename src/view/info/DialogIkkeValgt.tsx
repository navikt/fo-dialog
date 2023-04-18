import { BodyShort } from '@navikt/ds-react';
import classNames from 'classnames';
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
            <BodyShort>Velg en dialog for å lese den</BodyShort>
        </div>
    );
}

export default visibleIfHoc(DialogIkkeValgt);
