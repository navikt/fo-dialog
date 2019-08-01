import React from 'react';
import { useDialogContext } from '../Context';
import { matchPath, RouteComponentProps, withRouter } from 'react-router';
import { Aktivitetskort } from './Aktivitetskort';
import { hasData } from '@nutgaard/use-fetch';

interface Props extends RouteComponentProps<{ dialogId?: string }> {}

function AktivitetContainer(props: Props) {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const match = matchPath<{ dialogId: string }>(props.location.pathname, '/:dialogId');
    const dialogId = match ? match.params.dialogId : undefined;

    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    return (
        <div className="aktivitet-container">
            <Aktivitetskort dialog={valgtDialog} />
        </div>
    );
}

export default withRouter(AktivitetContainer);
