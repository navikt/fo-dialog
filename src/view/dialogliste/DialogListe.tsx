import React from 'react';
import { hasData } from '@nutgaard/use-fetch';
import { DialogPreviewListe } from './DialogPreview';
import { DialogData } from '../../utils/Typer';
import { useDialogContext } from '../Provider';
import { useParams } from 'react-router';
import styles from './DialogOversikt.module.less';
import { Systemtittel } from 'nav-frontend-typografi';
import InvertedLestMer from '../../felleskomponenter/InvertedLesMer';
import NyDialogLink from './NyDialogLink';
import useKansendeMelding from '../../utils/UseKanSendeMelding';

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
    const kanSendeMelding = useKansendeMelding();

    const sorterteDialoger = dialogData.sort((a, b) => sortDialoger(a, b));

    const { naaverende, historiske } = sorterteDialoger.reduce(splitHistoriske, { naaverende: [], historiske: [] });
    const skulHistoriske = historiske.length === 0;

    return (
        <section className={styles.dialogListe}>
            <NyDialogLink visible={kanSendeMelding} className={styles.nyDialog} />
            <DialogPreviewListe dialoger={naaverende} valgDialog={dialogId} />

            <InvertedLestMer apneTekst="Se dialoger fra tidligere perioder" lukkTekst="Skjul" hidden={skulHistoriske}>
                <Systemtittel className={styles.tidligerePeriodeTittel} tag="h1">
                    Dialoger fra tidligere perioder
                </Systemtittel>
                <DialogPreviewListe dialoger={historiske} valgDialog={dialogId} />
            </InvertedLestMer>
        </section>
    );
}

function sortDialoger(a: DialogData, b: DialogData): number {
    const adato = a.sisteDato === null ? '' : '' + a.sisteDato;
    const bdato = b.sisteDato === null ? '' : '' + b.sisteDato;
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export default DialogListe;
