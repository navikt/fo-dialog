import { DialogData, HenvendelseData, StringOrNull } from '../../utils/Typer';
import React, { useLayoutEffect, useRef } from 'react';
import { Henvendelse } from './Henvendelse';
import LestAvTidspunkt from '../lest/LestTidspunkt';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import { Systemtittel } from 'nav-frontend-typografi';

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
        const elem = document.querySelector('.henvendelse-item:last-of-type');
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

    const lesteMeldinger = henvendelser.filter(henvendelse => datoComparator(henvendelse.sendt, lest) >= 0);
    const sistLeste = lesteMeldinger[lesteMeldinger.length - 1];
    return sistLeste ? sistLeste.id : null;
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
        <section aria-label="Meldinger" className="henvendelse-list">
            <Systemtittel className="visually-hidden">Meldinger</Systemtittel>
            <div className="henvendelse-list__viewport">
                {sorterteHenvendelser.map(henvendelse => (
                    <React.Fragment key={henvendelse.id}>
                        <div className="henvendelse-list__henvendelse henvendelse-item">
                            <Henvendelse henvendelseData={henvendelse} />
                        </div>
                        <LestAvTidspunkt
                            tidspunkt={lestAvBrukerTidspunkt!}
                            visible={henvendelse.id === sisteHenvendelseLestAvBruker}
                        />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
