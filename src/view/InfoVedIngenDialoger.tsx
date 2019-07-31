import React from 'react';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';
import { Normaltekst } from 'nav-frontend-typografi';
import { ReactComponent as IngenDialoger } from './dialogIngen.svg';

import './dialogoverview.less';

function InfoVedIngenDialoger() {
    return (
        <div className="ingen-dialog-info">
            <div className="ingen-dialog-info-bilde">
                <IngenDialoger />
            </div>
            <Normaltekst>Her kan du sende melding til veilederen din om arbeid og oppfølging.</Normaltekst>
            <Normaltekst>Du kan forvente svar i løpet av noen dager.</Normaltekst>
            <Normaltekst>Klikk på Ny dialog.</Normaltekst>
        </div>
    );
}
const InfoVedIngenDialogerVisible = visibleIfHoc(InfoVedIngenDialoger);

export default InfoVedIngenDialogerVisible;
