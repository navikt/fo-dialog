import React from 'react';
import { formaterDateAndTime } from '../../utils/Date';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';

import '../henvendelse/henvendelseList.less';

interface Props {
    tidspunkt: string;
}
function LestAvTidspunkt(props: Props) {
    const tidspunktMedRiktigFormat = formaterDateAndTime(props.tidspunkt);
    return (
        <div className={'henvendelser__lest-av-bruker--tittel  ::before'}>
            <span>{`Lest av bruker ${tidspunktMedRiktigFormat}`}</span>
        </div>
    );
}

export default visibleIfHoc(LestAvTidspunkt);
