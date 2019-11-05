import React from 'react';
import { useDialogContext } from '../Provider';
import { matchPath, RouteComponentProps, withRouter } from 'react-router';
import { Aktivitetskort } from './Aktivitetskort';
import { hasData } from '@nutgaard/use-fetch';
import styles from './AktivitetContainer.module.less';
interface Props extends RouteComponentProps<{ dialogId?: string }> {}

function AktivitetContainer(props: Props) {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const match = matchPath<{ dialogId: string }>(props.location.pathname, '/:dialogId');
    const dialogId = match ? match.params.dialogId : undefined;

    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);

    return (
        <div className={styles.aktivitetContainer}>{valgtDialog ? <Aktivitetskort dialog={valgtDialog} /> : null}</div>
    );
}

export default withRouter(AktivitetContainer);
