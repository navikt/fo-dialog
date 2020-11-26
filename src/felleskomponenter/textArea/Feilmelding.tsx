import { Feilmelding as NavFeilmelding } from 'nav-frontend-typografi';
import React from 'react';

interface Props {
    feilmelding?: string;
    id: string;
}

const Feilemelding = (props: Props) => (
    <div aria-live="polite" id={props.id}>
        {props.feilmelding && <NavFeilmelding>{props.feilmelding}</NavFeilmelding>}
    </div>
);

export default Feilemelding;
