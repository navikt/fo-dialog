import React, { useEffect } from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { HenvendelseList } from '../henvendelse/HenvendelseList';
import { DialogHeader } from './DialogHeader';
import { useDialogContext, useOppfolgingContext } from '../Provider';
import { RouteComponentProps, withRouter } from 'react-router';
import DialogInputBoxVisible from './DialogInputBox';

import './Dialog.less';
import { OppfolgingData } from '../../utils/Typer';

interface Props extends RouteComponentProps<{ dialogId?: string }> {}

function kansendeMelding(oppfolgingData: OppfolgingData | null): boolean {
    return (
        !!oppfolgingData &&
        oppfolgingData.underOppfolging &&
        !oppfolgingData.reservasjonKRR &&
        oppfolgingData.kanVarsles
    );
}

export function Dialog(props: Props) {
    const oppfolgingData = useOppfolgingContext();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const dialogId = props.match.params.dialogId;
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    useEffect(() => {
        if (valgtDialog && !valgtDialog.lest) {
            fetch('/veilarbdialog/api/dialog/lest', {
                method: 'PUT',
                body: JSON.stringify({
                    lest: true,
                    dialogId: valgtDialog.id
                })
            }).then(() => dialoger.rerun());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valgtDialog]);

    if (!valgtDialog) return null;

    return (
        <div className="dialog">
            <DialogHeader dialog={valgtDialog} />
            <HenvendelseList dialogData={valgtDialog} />
            <DialogInputBoxVisible
                key={valgtDialog.id}
                dialog={valgtDialog}
                visible={kansendeMelding(oppfolgingData)}
            />
        </div>
    );
}

export default withRouter(Dialog);
