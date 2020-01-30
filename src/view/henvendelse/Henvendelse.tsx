import React from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { HenvendelseData } from '../../utils/Typer';
import { formaterDateAndTime } from '../../utils/Date';

import './Henvendelse.less';
import Tekstomrade from '../../felleskomponenter/tekstomrade/Tekstomrade';

interface Props {
    henvendelseData: HenvendelseData;
}

export function Henvendelse(props: Props) {
    const { avsender, sendt, tekst, avsenderId } = props.henvendelseData;
    const erMeldingFraBruker: boolean = avsender === 'BRUKER';
    const date: string = formaterDateAndTime(sendt);
    const toppTekst = erMeldingFraBruker || !avsenderId ? date : `${date} - ${avsenderId}`;
    const className = erMeldingFraBruker ? 'ikon bruker-ikon' : 'ikon veileder-ikon';
    return (
        <Snakkeboble topp={toppTekst} pilHoyre={erMeldingFraBruker} ikonClass={className}>
            <Tekstomrade>{tekst}</Tekstomrade>
        </Snakkeboble>
    );
}
