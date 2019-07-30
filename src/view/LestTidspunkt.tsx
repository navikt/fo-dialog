import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { formaterDateAndTime } from '../utils/date';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';

interface Props {
    tidspunkt: string;
}
function LestAvTidspunkt(props: Props) {
    const tidspunktMedRiktigFormat = formaterDateAndTime(props.tidspunkt);
    return <Normaltekst>Lest av bruker {tidspunktMedRiktigFormat}</Normaltekst>;
}

const LestAvTidspunktVisible = visibleIfHoc(LestAvTidspunkt);
export default LestAvTidspunktVisible;
