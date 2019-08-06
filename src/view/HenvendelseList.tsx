import { DialogData, HenvendelseData } from '../utils/typer';
import React, { useEffect, useRef } from 'react';
import { Henvendelse } from './Henvendelse';
import { hasData } from '@nutgaard/use-fetch';
import { useDialogContext } from '../Context';
import LestAvTidspunktVisible from './LestTidspunkt';

import './henvendelseList.less';

interface Props {
    dialogData: DialogData;
}

function useScrollToLast(dialogData: DialogData) {
    const previousDialog = useRef('');
    const henvendelseLenge = dialogData.henvendelser.length;

    useEffect(() => {
        const isFirstRender = dialogData.id !== previousDialog.current;
        previousDialog.current = dialogData.id;

        const behavior: ScrollBehavior = isFirstRender ? 'auto' : 'smooth';
        const elem = document.querySelector('.henvendelse-list__henvendelse:last-of-type');
        if (elem !== null) {
            console.log('scroll', behavior);
            elem.scrollIntoView({ block: 'nearest', behavior });
        }
    }, [previousDialog, henvendelseLenge, dialogData.id]);
}

function datoComparator(adato: string, bdato: string): number {
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

export function HenvendelseList(props: Props) {
    useScrollToLast(props.dialogData);
    const dialoger = useDialogContext();

    if (!props.dialogData.henvendelser) {
        return null;
    }

    const langtUtIFremtiden = '9999-12-31T23:59:59.000+01:00';
    const henvendelseDataList = props.dialogData.henvendelser;
    const dialogId = henvendelseDataList[0].dialogId;
    const dialogData = hasData(dialoger) ? dialoger.data : [];
    const valgtDialog = dialogData.find(dialog => dialog.id === dialogId);
    const lestAvBrukerTidspunkt = valgtDialog
        ? valgtDialog.lestAvBrukerTidspunkt === ''
            ? langtUtIFremtiden
            : valgtDialog.lestAvBrukerTidspunkt
        : langtUtIFremtiden;

    const henvendelserSynkende =
        henvendelseDataList &&
        henvendelseDataList.sort((a: HenvendelseData, b: HenvendelseData) => datoComparator(a.sendt, b.sendt));

    const sisteHenvendelseLestAvBruker =
        lestAvBrukerTidspunkt &&
        henvendelserSynkende.find(henvendelse => datoComparator(lestAvBrukerTidspunkt, henvendelse.sendt) >= 0);

    const id4SisteHenvendelseLestAvBruker = sisteHenvendelseLestAvBruker ? sisteHenvendelseLestAvBruker.id : null;
    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport">
                {props.dialogData.henvendelser.map(henvendelse => (
                    <div key={henvendelse.id} className={'henvendelse-list__henvendelse'}>
                        <LestAvTidspunktVisible
                            tidspunkt={lestAvBrukerTidspunkt!}
                            visible={
                                sisteHenvendelseLestAvBruker === null || sisteHenvendelseLestAvBruker === undefined
                                    ? false
                                    : henvendelse.id === id4SisteHenvendelseLestAvBruker
                            }
                        />
                        <Henvendelse henvendelseData={henvendelse} />
                    </div>
                ))}
            </div>
        </div>
    );
}
