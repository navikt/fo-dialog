import React from 'react';
import StatusAdvarselWrapper, { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

export default function KanIkkeVarsles(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <Bruker />;
}

function Bruker() {
    return (
        <StatusAdvarselWrapper>
            Du kan ikke varsles om meldinger. Dette er en feil.
            <br />
            Vennligst ring teknisk brukerstøtte
            <br />
            tlf: 55 55 33 39, tastevalg 3.
        </StatusAdvarselWrapper>
    );
}
