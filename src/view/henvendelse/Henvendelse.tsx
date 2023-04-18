import { BodyShort, Chat, Textarea } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import { ViktigMelding } from '../../felleskomponenter/etiketer/Etikett';
import { formaterDateAndTime } from '../../utils/Date';
import { HenvendelseData } from '../../utils/Typer';
import { useUserInfoContext } from '../BrukerProvider';
import styles from './Henvendelse.module.less';

function accessibleText(erBruker: boolean, erMeldingFraBruker: boolean) {
    if (erMeldingFraBruker) {
        return erBruker ? 'Deg' : 'Bruker';
    }

    return 'NAV';
}

interface Props {
    henvendelseData: HenvendelseData;
    viktigMarkering: boolean;
}

export function Henvendelse(props: Props) {
    const { viktigMarkering } = props;
    const { avsender, sendt, tekst, avsenderId } = props.henvendelseData;
    const brukerData = useUserInfoContext();
    const erBruker = brukerData?.erBruker ?? false;

    const erMeldingFraBruker: boolean = avsender === 'BRUKER';
    const date: string = formaterDateAndTime(sendt);
    const toppTekst = erMeldingFraBruker || !avsenderId ? date : `${date} - ${avsenderId}`;
    const className = erMeldingFraBruker ? styles.brukerIkon : styles.veilederIkon;
    const classNameStyle = erMeldingFraBruker ? styles.hendvendelsebruker : styles.hendvendelse;

    return (
        <>
            <BodyShort className="visually-hidden">{accessibleText(erBruker, erMeldingFraBruker)}</BodyShort>
            <Chat.Bubble
                className={classNames(classNameStyle)}
                // topp={toppTekst}
                // pilHoyre={erMeldingFraBruker}
                // ikonClass={className}
            >
                <div className="flex flex-col items-start">
                    <ViktigMelding visible={viktigMarkering} />
                    <span className="mt-2">{tekst}</span>
                </div>
            </Chat.Bubble>
        </>
    );
}
