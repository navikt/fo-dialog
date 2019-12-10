import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import DialogPreview from './DialogPreview';
import { DialogData } from '../../utils/Typer';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import styles from './DialogOversikt.module.less';

export function DialogListe() {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();

    const sortedOppfolgingsData = dialogData.sort((a, b) => sortDialoger(a, b));

    return (
        <div className={styles.dialogListe}>
            {sortedOppfolgingsData.map(dialog => (
                <DialogPreview dialog={dialog} key={dialog.id} valgtDialogId={dialogId} />
            ))}
        </div>
    );
}

function sortDialoger(a: DialogData, b: DialogData): number {
    const adato = a.sisteDato === null ? '' : '' + a.sisteDato;
    const bdato = b.sisteDato === null ? '' : '' + b.sisteDato;
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export default DialogListe;
