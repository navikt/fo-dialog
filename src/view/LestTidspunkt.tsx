import React from 'react';
import { formaterDateAndTime } from '../utils/date';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';

import './henvendelseList.less';

interface Props {
    tidspunkt: string;
}
function LestAvTidspunkt(props: Props) {
    const tidspunktMedRiktigFormat = formaterDateAndTime(props.tidspunkt);
    return (
        <div className={'henvendelser__lest-av-bruker--tittel  ::before'}>
            <span>Lest av bruker</span>
            <span>&nbsp;</span>
            <span>{tidspunktMedRiktigFormat}</span>
        </div>
    );
}

const LestAvTidspunktVisible = visibleIfHoc(LestAvTidspunkt);
export default LestAvTidspunktVisible;
