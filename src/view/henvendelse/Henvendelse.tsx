import Snakkeboble from 'nav-frontend-snakkeboble';
import Tekstomrade, { LinebreakRule, LinkRule, ParagraphRule } from 'nav-frontend-tekstomrade';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

import { ViktigMelding } from '../../felleskomponenter/etiketer/Etikett';
import { formaterDateAndTime } from '../../utils/Date';
import { HenvendelseData } from '../../utils/Typer';
import { useUserInfoContext } from '../BrukerProvider';
import { markdownLink } from './CustomRules';
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
            <Normaltekst className="visually-hidden">{accessibleText(erBruker, erMeldingFraBruker)}</Normaltekst>
            <Snakkeboble
                className={classNameStyle}
                topp={toppTekst}
                pilHoyre={erMeldingFraBruker}
                ikonClass={className}
            >
                <ViktigMelding visible={viktigMarkering} className={styles.viktig} />
                <Tekstomrade rules={[LinkRule, LinebreakRule, ParagraphRule, markdownLink]} className="blokk-xs">
                    {tekst}
                </Tekstomrade>
            </Snakkeboble>
        </>
    );
}
