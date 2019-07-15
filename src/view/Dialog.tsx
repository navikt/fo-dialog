import React from 'react';
import { DialogData } from '../utils/typer';

import { HenvendelseList } from './HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { DialogInputBoxVisible } from './DialogInputBox';
import { useOppfolgingContext } from '../Context';
import './Dialog.less';
import { RouteComponentProps, withRouter } from 'react-router';
import { Aktivitetskort } from './Aktivitetskort';
import { AktivitetskortPreview } from './AktivitetskortPreview';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

interface Props extends RouteComponentProps<{ dialogId?: string }> {
    dialogData: DialogData[];
}

export function Dialog(props: Props) {
    const oppfolgingData = useOppfolgingContext();
    const dialogId = props.match.params.dialogId;
    const valgtDialog = props.dialogData.find(dialog => dialog.id === dialogId);

    if (props.dialogData.length === 0) {
        return (
            <div className="dialog">
                <Innholdstittel>Dialog</Innholdstittel>
                <Normaltekst>Her kan du sende melding til veilederen din om arbeid og oppfølging.</Normaltekst>
                <Normaltekst>Du kan forvente svar i løpet av noen dager.</Normaltekst>
                <Normaltekst>Klikk på "Ny dialog"</Normaltekst>
            </div>
        );
    } else {
        if (!valgtDialog) {
            return (
                <div className="dialog">
                    <Innholdstittel>Dialog</Innholdstittel>
                    <Normaltekst>Detaljer for valgt dialog vises her.</Normaltekst>
                    <Normaltekst> - Du kan velge en dialog fra oversikten, </Normaltekst>
                    <Normaltekst> - Du kan klikke på "Ny Dialog" for å starte en ny en.</Normaltekst>
                </div>
            );
        }
        return (
            <>
                <div className="dialog">
                    <AktivitetskortPreview dialog={valgtDialog}/>
                    <DialogHeader dialog={valgtDialog}/>
                    <HenvendelseList henvendelseDataList={valgtDialog.henvendelser}/>
                    <DialogInputBoxVisible  dialog={valgtDialog} visible={oppfolgingData!.underOppfolging}/>
                </div>
                <Aktivitetskort dialog={valgtDialog}/>
            </>
        );
    }
}

export default withRouter(Dialog);
