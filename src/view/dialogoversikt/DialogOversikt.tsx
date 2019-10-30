import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import DialogPreview from './DialogPreview';
import { DialogData } from '../../utils/Typer';
import { DialogOverviewHeaderVisible } from './DialogOverviewHeader';
import InfoVedIngenDialoger from '../InfoVedIngenDialoger';
import { useDialogContext, useOppfolgingContext } from '../Provider';

import './DialogOversikt.less';
import { matchPath, RouteComponentProps, withRouter } from 'react-router';
import classNames from 'classnames';
interface Props extends RouteComponentProps<{ dialogId?: string }> {}

export function DialogOversikt(props: Props) {
    const oppfolgingData = useOppfolgingContext();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const ingenDialoger = dialogData.length === 0;
    const valgtDialogId = matchPath<{ dialogId: string }>(props.location.pathname, '/:dialogId');
    const dialogId = valgtDialogId ? valgtDialogId.params.dialogId : null;
    const erUnderOppfolging = oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;

    const visningCls = classNames('dialog-overview', {
        'dialog-overview__valgt': valgtDialogId
    });

    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return null;
    }
    const sortedOppfolgingsData = dialogData.sort((a, b) => sortDialoger(a, b));
    return (
        <div className={visningCls}>
            <DialogOverviewHeaderVisible visible={oppfolgingData!.underOppfolging} />
            <InfoVedIngenDialoger visible={ingenDialoger} />
            <div className="dialog-overview__preview-list">
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
