import { DialogData, HenvendelseData, StringOrNull } from '../../utils/Typer';
import React, { useLayoutEffect, useRef } from 'react';
import { Henvendelse } from './Henvendelse';
import LestAvTidspunkt from '../dialog/LestTidspunkt';

import './henvendelseList.less';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';

interface Props {
    dialogData: DialogData;
}

function useScrollToLast(dialogData: DialogData) {
    const previousDialog = useRef('');
    const henvendelseLenge = dialogData.henvendelser.length;

    useLayoutEffect(() => {
        const isFirstRender = dialogData.id !== previousDialog.current;
        previousDialog.current = dialogData.id;

        const behavior: ScrollBehavior = isFirstRender ? 'auto' : 'smooth';
        const elem = document.querySelector('.henvendelse-list__henvendelse:last-of-type');
        if (elem !== null) {
            elem.scrollIntoView({ block: 'nearest', behavior });
        }
    }, [previousDialog, henvendelseLenge, dialogData.id]);
}

function datoComparator(adato: string, bdato: string): number {
    return adato > bdato ? -1 : adato === bdato ? 0 : 1;
}

function sisteLesteHenvendelse(lest: StringOrNull, henvendelser: HenvendelseData[]) {
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
    useSkjulHodefotForMobilVisning();

    if (!henvendelser) {
        return null;
    }
    const sorterteHenvendelser = henvendelser.sort((a, b) => datoComparator(b.sendt, a.sendt));
    const sisteHenvendelseLestAvBruker = sisteLesteHenvendelse(lestAvBrukerTidspunkt, sorterteHenvendelser);

    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport">
                {sorterteHenvendelser.map(henvendelse => (
                    <div key={henvendelse.id} className={'henvendelse-list__henvendelse'}>
                        <LestAvTidspunkt
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
