import React from 'react';
import { useParams } from 'react-router';

import { DialogData } from '../../utils/Typer';
import { useDialogContext } from '../DialogProvider';
import styles from './DialogOversikt.module.less';
import { DialogPreviewListe } from './DialogPreview';
import HistoriskeDialogerOversikt from './HistoriskDialogListe';

interface Res {
    naaverende: DialogData[];
    historiske: DialogData[];
}

function splitHistoriske(acc: Res, cur: DialogData) {
    cur.historisk ? acc.historiske.push(cur) : acc.naaverende.push(cur);
    return acc;
}

export function DialogListe() {
    const { dialoger } = useDialogContext();
    const { dialogId } = useParams();

    const sorterteDialoger = dialoger.sort((a, b) => sortDialoger(a, b));
    const { naaverende, historiske } = sorterteDialoger.reduce(splitHistoriske, { naaverende: [], historiske: [] });

    return (
        <div className={styles.dialogListe} role="navigation" aria-label="Dialoger">
            <DialogPreviewListe dialoger={naaverende} valgDialog={dialogId} />
            <HistoriskeDialogerOversikt historiske={historiske} valgDialog={dialogId} />
        </div>
    );
}

function sortDialoger(a: DialogData, b: DialogData): number {
    const adato = a.sisteDato === null ? '' : '' + a.sisteDato;
    const bdato = b.sisteDato === null ? '' : '' + b.sisteDato;
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export default DialogListe;
