import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { DialogPreviewListe } from './DialogPreview';
import { DialogData } from '../../utils/Typer';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import styles from './DialogOversikt.module.less';
import { Systemtittel } from 'nav-frontend-typografi';
import InvertedLestMer from '../../felleskomponenter/InvertedLesMer';
import { InfoOmDialog } from '../info/InfoOmDialog';

interface Res {
    naaverende: DialogData[];
    historiske: DialogData[];
}

function splitHistoriske(acc: Res, cur: DialogData) {
    cur.historisk ? acc.historiske.push(cur) : acc.naaverende.push(cur);
    return acc;
}

export function DialogListe() {
    const dialoger = useDialogContext();
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const { dialogId } = useParams();

    const sorterteDialoger = dialogData.sort((a, b) => sortDialoger(a, b));

    const { naaverende, historiske } = sorterteDialoger.reduce(splitHistoriske, { naaverende: [], historiske: [] });
    const skulHistoriske = historiske.length === 0;

    return (
        <section className={styles.dialogListe}>
            <DialogPreviewListe dialoger={naaverende} valgDialog={dialogId} />

            <InvertedLestMer apneTekst="Se dialoger fra tidligere perioder" lukkTekst="Skjul" hidden={skulHistoriske}>
                <Systemtittel className={styles.tidligerePeriodeTittel} tag="h1">
                    Dialoger fra tidligere perioder
                </Systemtittel>
                <DialogPreviewListe dialoger={historiske} valgDialog={dialogId} />
            </InvertedLestMer>

            <InfoOmDialog hidden={dialogData.length === 0} />
        </section>
    );
}

function sortDialoger(a: DialogData, b: DialogData): number {
    const adato = a.sisteDato === null ? '' : '' + a.sisteDato;
    const bdato = b.sisteDato === null ? '' : '' + b.sisteDato;
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export default DialogListe;
