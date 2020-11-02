import React from 'react';
import StatusAdvarselWrapper from './StatusAdvarselWrapper';
import TekniskFeilBrukerstotte from './TekniskFeilBrukerstotte';

interface Props {
    erVeileder: boolean;
}

const ManglerNivaa4Veileder = () => (
    <StatusAdvarselWrapper>
        Du kan ikke sende dialogmelding fordi brukeren ikke har vært innlogget de siste 18 månedene med nivå 4 (for
        eksempel BankID).
    </StatusAdvarselWrapper>
);
const Nivaa4FeilerVeilede = () => (
    <StatusAdvarselWrapper>
        Noe gikk galt, og du får dessverre ikke sendt dialogmeldinger. Prøv igjen senere.
    </StatusAdvarselWrapper>
);

const ManglerNivaa4 = (props: Props) => (props.erVeileder ? <ManglerNivaa4Veileder /> : <TekniskFeilBrukerstotte />);
const Nivaa4Feiler = (props: Props) => (props.erVeileder ? <Nivaa4FeilerVeilede /> : <TekniskFeilBrukerstotte />);

export { ManglerNivaa4, Nivaa4Feiler };
