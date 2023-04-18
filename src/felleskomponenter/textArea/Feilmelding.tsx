import { BodyShort, ErrorSummary } from '@navikt/ds-react';
import React from 'react';

interface Props {
    feilmelding?: string;
    id: string;
}

const Feilemelding = (props: Props) =>
    props.feilmelding ? (
        <ErrorSummary id={props.id}>{props.feilmelding && <BodyShort>{props.feilmelding}</BodyShort>}</ErrorSummary>
    ) : null;

export default Feilemelding;
