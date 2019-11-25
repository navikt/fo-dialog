import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import DialogPreview from './DialogPreview';
import { DialogData } from '../../utils/Typer';
import DialogOverviewHeader from './DialogOverviewHeader';
import { dataOrUndefined, useDialogContext, useOppfolgingContext } from '../Provider';

import { matchPath, RouteComponentProps, withRouter } from 'react-router';
import classNames from 'classnames';
import styles from './DialogOversikt.module.less';
import { kansendeMelding } from '../dialog/Dialog';

interface Props extends RouteComponentProps<{ dialogId?: string }> {}

export function DialogOversikt(props: Props) {
    const oppfolgingContext = useOppfolgingContext();
    const dialoger = useDialogContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const valgtDialogId = matchPath<{ dialogId: string }>(props.location.pathname, '/:dialogId');
    const dialogId = valgtDialogId ? valgtDialogId.params.dialogId : null;
    const erUnderOppfolging = oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;
    const visningCls = valgtDialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return null;
    }
    const sortedOppfolgingsData = dialogData.sort((a, b) => sortDialoger(a, b));
    return (
        <div className={visningCls}>
            <DialogOverviewHeader visible={kansendeMelding(oppfolgingData)} />
            <div className={styles.listeContainer}>
                {sortedOppfolgingsData.map(dialog => (
                    <DialogPreview dialog={dialog} key={dialog.id} valgtDialogId={dialogId} />
                ))}
            </div>
        </div>
    );
}

function sortDialoger(a: DialogData, b: DialogData): number {
    var adato = a.sisteDato === null ? '' : '' + a.sisteDato;
    var bdato = b.sisteDato === null ? '' : '' + b.sisteDato;
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export default withRouter(DialogOversikt);
