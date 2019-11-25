import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import DialogPreview from './DialogPreview';
import { DialogData } from '../../utils/Typer';
import DialogOverviewHeader from './NyDialogLink';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import classNames from 'classnames';
import styles from './DialogListe.module.less';
import useKansendeMelding from '../../utils/UseKanSendeMelding';

export function DialogListe() {
    const kanSendeMelding = useKansendeMelding();
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();

    const visningCls = dialogId ? classNames(styles.dialogOversikt, styles.dialogValgt) : styles.dialogOversikt;

    const sortedOppfolgingsData = dialogData.sort((a, b) => sortDialoger(a, b));
    return (
        <div className={visningCls}>
            <DialogOverviewHeader visible={kanSendeMelding} />
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

export default DialogListe;
