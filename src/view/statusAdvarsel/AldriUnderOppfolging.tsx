import React from 'react';
import Lenke from 'nav-frontend-lenker';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';
import useApiBasePath from '../../utils/UseApiBasePath';

interface Props {
    erVeileder: boolean;
}

export default function AldriUnderOppfolging(props: Props) {
    return props.erVeileder ? <Veileder /> : <Bruker />;
}

function Veileder() {
    return <StatusAdvarselWrapper>Denne brukeren har ikke tidligere dialoger i Modia.</StatusAdvarselWrapper>;
}

function Bruker() {
    const basePath = useApiBasePath();

    return (
        <StatusAdvarselWrapper>
            Du må være registrert hos NAV for å bruke dialogen. <br />
            <Lenke href={`${basePath}/arbeidssokerregistrering`}>Registrer deg hos NAV</Lenke>
        </StatusAdvarselWrapper>
    );
}
