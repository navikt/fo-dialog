import React from 'react';
import { visibleIfHoc } from '../felleskomponenter/visibleIfHoc';
import { Normaltekst } from 'nav-frontend-typografi';
import { ReactComponent as IngenDialoger } from '../fellesikoner/snakkebobler.svg';

function InfoVedIngenDialoger() {
    return (
        <div className="ingen-dialog-info">
            <div className="ingen-dialog-info-bilde">
                <IngenDialoger />
            </div>
            <Normaltekst className="infotekst">
                Her kan du sende melding til veilederen din om arbeid og oppfølging.
            </Normaltekst>
            <Normaltekst className="infotekst">Du kan forvente svar i løpet av noen dager.</Normaltekst>
            <Normaltekst className="infotekst">Klikk på Ny dialog.</Normaltekst>
        </div>
    );
}
const InfoVedIngenDialogerVisible = visibleIfHoc(InfoVedIngenDialoger);

export default InfoVedIngenDialogerVisible;
