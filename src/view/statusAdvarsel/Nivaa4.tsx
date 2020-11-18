import React from 'react';

import StatusAdvarselWrapper from './StatusAdvarselWrapper';
import TekniskFeilBrukerstotte from './TekniskFeilBrukerstotte';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';

interface Props {
    erVeileder: boolean;
}

const Mere = () => (
    <Hjelpetekst type={PopoverOrientering.Over}>
        Dette er et midlertidig problem på grunn av ny teknisk løsning etter koronasituasjonen.
        <ul>
            <li>
                Hvis brukeren svarer på digital dialog, så kan du kommunisere digitalt. Forhåndsorientering og varsel
                vil ikke fungere på denne brukeren.
                <br />
            </li>
            <li>Hvis brukeren ikke svarer på digital dialog, så setter du brukeren til manuell bruker.</li>
        </ul>
    </Hjelpetekst>
);

const ManglerNivaa4Veileder = () => (
    <StatusAdvarselWrapper>
        Systemet får ikke sjekket om denne brukeren er en digital eller manuell bruker. <Mere />
    </StatusAdvarselWrapper>
);
const Nivaa4FeilerVeilede = () => (
    <StatusAdvarselWrapper>
        Noe gikk galt, og du får dessverre ikke sendt dialogmeldinger. Prøv igjen senere.
    </StatusAdvarselWrapper>
);

export const ManglerNivaa4 = (props: Props) =>
    props.erVeileder ? <ManglerNivaa4Veileder /> : <TekniskFeilBrukerstotte />;
export const Nivaa4Feiler = (props: Props) =>
    props.erVeileder ? <Nivaa4FeilerVeilede /> : <TekniskFeilBrukerstotte />;
