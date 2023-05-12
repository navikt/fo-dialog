import { HelpText } from '@navikt/ds-react';
import React from 'react';

import StatusAdvarselWrapper from './StatusAdvarselWrapper';
import TekniskFeilBrukerstotte from './TekniskFeilBrukerstotte';

interface Props {
    erVeileder: boolean;
}

const Mere = () => (
    <HelpText placement="top">
        Denne brukeren har ikke vært innlogget de siste 18 månedene med nivå 4 (for eksempel BankID). <br />
        Du kan derfor ikke sende forhåndsorientering, varsel og meldinger.
    </HelpText>
);

const ManglerNivaa4Veileder = () => (
    <StatusAdvarselWrapper>
        Denne brukeren kan ikke logge inn i aktivitetsplan og dialog. <Mere />
    </StatusAdvarselWrapper>
);
const Nivaa4FeilerVeileder = () => (
    <StatusAdvarselWrapper>
        Noe gikk galt, og du får dessverre ikke sendt dialogmeldinger. Prøv igjen senere.
    </StatusAdvarselWrapper>
);

export const ManglerNivaa4 = (props: Props) =>
    props.erVeileder ? <ManglerNivaa4Veileder /> : <TekniskFeilBrukerstotte />;
export const Nivaa4Feiler = (props: Props) =>
    props.erVeileder ? <Nivaa4FeilerVeileder /> : <TekniskFeilBrukerstotte />;
