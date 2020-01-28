import React from 'react';
import { formaterDateAndTime } from '../../utils/Date';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { Undertekst } from 'nav-frontend-typografi';
import '../henvendelse/henvendelseList.less';

interface Props {
    tidspunkt: string;
}
function LestAvTidspunkt(props: Props) {
    const tidspunktMedRiktigFormat = formaterDateAndTime(props.tidspunkt);
    return (
        <div className={'henvendelser__lest-av-bruker--tittel  ::before'}>
            <Undertekst>
                <span>{`Lest av bruker ${tidspunktMedRiktigFormat}`}</span>
            </Undertekst>
        </div>
    );
}

export default visibleIfHoc(LestAvTidspunkt);
