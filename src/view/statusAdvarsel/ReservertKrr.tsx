import Lenke from 'nav-frontend-lenker';
import React from 'react';

import StatusAdvarselWrapper, { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

export default function ReservertKrr(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <BrukerKrr />;
}

function BrukerKrr() {
    return (
        <StatusAdvarselWrapper>
            For å ta i bruk den digitale dialogen med din veileder, må du fjerne reservasjonen din mot digital
            kommunikasjon.
            <Lenke href="https://www.norge.no/nn/reservasjon">Gå til Norge.no for å fjerne reservasjonen</Lenke>
        </StatusAdvarselWrapper>
    );
}
