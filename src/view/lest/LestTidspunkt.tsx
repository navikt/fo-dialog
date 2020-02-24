import React from 'react';
import { formaterDateAndTime } from '../../utils/Date';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { Undertekst } from 'nav-frontend-typografi';
import { ReactComponent as Pil } from './pil.svg';
import styles from './LestTidspunkt.module.less';

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
