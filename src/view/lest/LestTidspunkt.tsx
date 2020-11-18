import { Undertekst } from 'nav-frontend-typografi';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { formaterDateAndTime } from '../../utils/Date';
import styles from './LestTidspunkt.module.less';
import { ReactComponent as Pil } from './pil.svg';

interface Props {
    tidspunkt: string;
}

function LestAvTidspunkt(props: Props) {
    const tidspunktMedRiktigFormat = formaterDateAndTime(props.tidspunkt);
    return (
        <div className={'henvendelse-item ' + styles.lestContainer}>
            <Pil className={styles.pil} />
            <Undertekst>{`Lest av bruker ${tidspunktMedRiktigFormat}`}</Undertekst>
        </div>
    );
}

export default visibleIfHoc(LestAvTidspunkt);
