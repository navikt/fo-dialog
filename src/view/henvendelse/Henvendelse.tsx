import React from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { HenvendelseData } from '../../utils/Typer';
import { formaterDateAndTime } from '../../utils/Date';
import Tekstomrade from 'nav-frontend-tekstomrade';

import './Henvendelse.less';

interface Props {
    henvendelseData: HenvendelseData;
}

export function Henvendelse(props: Props) {
    const erMeldingFraBruker: boolean = props.henvendelseData.avsender === 'BRUKER';
    const date: string = formaterDateAndTime(props.henvendelseData.sendt);
    const className: string = erMeldingFraBruker ? 'ikon bruker-ikon' : 'ikon veileder-ikon';
    return (
        <Snakkeboble topp={date} pilHoyre={erMeldingFraBruker} ikonClass={className}>
            <Tekstomrade>{props.henvendelseData.tekst}</Tekstomrade>
        </Snakkeboble>
    );
}
