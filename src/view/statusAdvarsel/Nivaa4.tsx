import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import React from 'react';

import StatusAdvarselWrapper from './StatusAdvarselWrapper';
import TekniskFeilBrukerstotte from './TekniskFeilBrukerstotte';

interface Props {
    erVeileder: boolean;
}

const Mere = () => (
    <Hjelpetekst type={PopoverOrientering.Over}>
        Denne brukeren har ikke vært innlogget de siste 18 månedene med nivå 4 (for eksempel BankID). <br />
        Du kan derfor ikke sende forhåndsorientering, varsel og meldinger.
    </Hjelpetekst>
);

const ManglerNivaa4Veileder = () => (
    <StatusAdvarselWrapper>
        Denne brukeren kan ikke logge inn i aktivitetsplan og dialog. <Mere />
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
