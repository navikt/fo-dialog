import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import DialogPreview from './DialogPreview';
import { DialogData } from '../../utils/Typer';
import DialogOverviewHeader from './DialogOverviewHeader';
import { useDialogContext, useOppfolgingContext } from '../Provider';
import { useParams } from 'react-router';
import classNames from 'classnames';
import styles from './DialogOversikt.module.less';

export function DialogOversikt() {
    const oppfolgingData = useOppfolgingContext();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();

    const erUnderOppfolging = oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;
    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    if (!erUnderOppfolging && !harOppfolgingsPerioder) {
        return null;
    }
    const sortedOppfolgingsData = dialogData.sort((a, b) => sortDialoger(a, b));
    return (
        <div className={visningCls}>
            <DialogOverviewHeader visible={oppfolgingData!.underOppfolging} />
            <div className={styles.listeContainer}>
                {sortedOppfolgingsData.map(dialog => (
                    <DialogPreview dialog={dialog} key={dialog.id} valgtDialogId={dialogId} />
                ))}
            </div>
        </div>
    );
}

function sortDialoger(a: DialogData, b: DialogData): number {
    const adato = a.sisteDato === null ? '' : '' + a.sisteDato;
    const bdato = b.sisteDato === null ? '' : '' + b.sisteDato;
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export default DialogOversikt;
