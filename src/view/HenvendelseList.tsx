import { DialogData, HenvendelseData, StringOrUndefinedOrNull } from '../utils/typer';
import React, { useEffect, useRef } from 'react';
import { Henvendelse } from './Henvendelse';
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

function sisteLesteHenvendelse(lest: StringOrUndefinedOrNull, henvendelser: HenvendelseData[]) {
    if (!lest) {
        return null;
    }

    const sistleste = henvendelser.find(henvendelse => datoComparator(lest, henvendelse.sendt) >= 0);
    return sistleste ? sistleste.id : null;
}

export function HenvendelseList(props: Props) {
    const dialogData = props.dialogData;
    const { lestAvBrukerTidspunkt, henvendelser } = dialogData;
    useScrollToLast(dialogData);

    if (!henvendelser) {
        return null;
    }
    const henvendelserSynkende = henvendelser.sort((a, b) => datoComparator(a.sendt, b.sendt));
    const sisteHenvendelseLestAvBruker = sisteLesteHenvendelse(lestAvBrukerTidspunkt, henvendelserSynkende);

    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport">
                {henvendelserSynkende.map(henvendelse => (
                    <div key={henvendelse.id} className={'henvendelse-list__henvendelse'}>
                        <LestAvTidspunktVisible
                            tidspunkt={lestAvBrukerTidspunkt!}
                            visible={henvendelse.id === sisteHenvendelseLestAvBruker}
                        />
                        <Henvendelse henvendelseData={henvendelse} />
                    </div>
                ))}
            </div>
        </div>
    );
}
