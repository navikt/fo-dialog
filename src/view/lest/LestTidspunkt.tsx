import { BodyShort } from '@navikt/ds-react';
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
            <BodyShort>{`Lest av bruker ${tidspunktMedRiktigFormat}`}</BodyShort>
        </div>
    );
}

export default visibleIfHoc(LestAvTidspunkt);
