import { Heading } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';

import { compareDates } from '../../utils/Date';
import { DialogData, MeldingsData, StringOrNull } from '../../utils/Typer';
import DialogSendtBekreftelse from '../dialog/DialogSendtBekreftelse';
import LestAvTidspunkt from '../lest/LestTidspunkt';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import { ViewState } from '../ViewState';
import { Melding } from './Melding';
import styles from './Meldinger.less';

interface Props {
    dialogData: DialogData;
    viewState: ViewState;
    fnr?: string;
}

function sisteLesteHenvendelse(lest: StringOrNull, henvendelser: MeldingsData[]) {
    if (!lest) {
        return null;
    }

    const lesteMeldinger = henvendelser.filter((henvendelse) => compareDates(henvendelse.sendt, lest) >= 0);
    const sistLeste = lesteMeldinger[lesteMeldinger.length - 1];
    return sistLeste ? sistLeste.id : null;
}

export function Meldinger(props: Props) {
    const { lestAvBrukerTidspunkt, henvendelser } = props.dialogData;

    const meldingListRef = useRef<HTMLElement>(null);

    const sorterteHenvendelser = !!henvendelser ? henvendelser.sort((a, b) => compareDates(b.sendt, a.sendt)) : [];

    useSkjulHodefotForMobilVisning();

    useEffect(() => {
        requestAnimationFrame(() => {
            if (meldingListRef) {
                meldingListRef.current?.scrollTo({ top: meldingListRef.current.scrollHeight, behavior: 'auto' });
            }
        });
    }, [henvendelser]);

    if (!henvendelser) {
        return null;
    }

    const erViktig = props.dialogData.egenskaper[0] === 'ESKALERINGSVARSEL';
    const sisteHenvendelseLestAvBruker = sisteLesteHenvendelse(lestAvBrukerTidspunkt, sorterteHenvendelser);

    return (
        <section
            id="henvendelse-scroll-list"
            aria-label="Meldinger"
            className="px-4 grow overflow-y-scroll bg-gray-100 xl:flex xl:justify-center"
            ref={meldingListRef}
            tabIndex={0}
        >
            <div className="xl:max-w-248 xl:w-full ">
                <Heading level="3" size={'medium'} className="hidden">
                    Meldinger
                </Heading>
                <div className="mb-4">
                    {sorterteHenvendelser.map((henvendelse, index) => (
                        <React.Fragment key={henvendelse.id}>
                            <div className={styles.henvendelseItem}>
                                <Melding
                                    henvendelseData={henvendelse}
                                    viktigMarkering={(erViktig && index === 0) || henvendelse.viktig}
                                />
                            </div>
                            <LestAvTidspunkt
                                tidspunkt={lestAvBrukerTidspunkt!}
                                visible={henvendelse.id === sisteHenvendelseLestAvBruker}
                            />
                        </React.Fragment>
                    ))}
                </div>
                <DialogSendtBekreftelse viewState={props.viewState} dialog={props.dialogData} fnr={props.fnr} />
            </div>
        </section>
    );
}
