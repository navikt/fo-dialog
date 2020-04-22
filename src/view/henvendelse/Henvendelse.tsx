import React from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { HenvendelseData } from '../../utils/Typer';
import { formaterDateAndTime } from '../../utils/Date';

import './Henvendelse.less';
import Tekstomrade, { LinkRule, ParagraphRule } from 'nav-frontend-tekstomrade';
import { Undertittel } from 'nav-frontend-typografi';
import { useUserInfoContext } from '../Provider';
import { markdownLink } from './CustomRules';

function accessibleText(erBruker: boolean, erMeldingFraBruker: boolean) {
    if (erMeldingFraBruker) {
        return erBruker ? 'Deg' : 'Bruker';
    }

    return 'NAV';
}

interface Props {
    henvendelseData: HenvendelseData;
}

export function Henvendelse(props: Props) {
    const { avsender, sendt, tekst, avsenderId } = props.henvendelseData;
    const brukerData = useUserInfoContext();
    const erBruker = brukerData?.erBruker ?? false;

    const erMeldingFraBruker: boolean = avsender === 'BRUKER';
    const date: string = formaterDateAndTime(sendt);
    const toppTekst = erMeldingFraBruker || !avsenderId ? date : `${date} - ${avsenderId}`;
    const className = erMeldingFraBruker ? 'ikon bruker-ikon' : 'ikon veileder-ikon';

    return (
        <>
            <Undertittel tag="h5" className="visually-hidden">
                {accessibleText(erBruker, erMeldingFraBruker)}
            </Undertittel>
            <Snakkeboble topp={toppTekst} pilHoyre={erMeldingFraBruker} ikonClass={className}>
                <Tekstomrade rules={[LinkRule, ParagraphRule, markdownLink]} className="blokk-xs">
                    {tekst}
                </Tekstomrade>
            </Snakkeboble>
        </>
    );
}
