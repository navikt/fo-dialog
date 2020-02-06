import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';

interface Props {
    hidden: boolean;
}

export function InfoOmDialog(props: Props) {
    if (props.hidden) {
        return null;
    }

    return (
        <>
            <Normaltekst>
                Her kan du sende meldinger til veilederen din om arbeid og oppfølging. Du kan forvente svar i løpet av
                noen dager.
            </Normaltekst>
            <Link to={'/informasjon'} className="lenke">
                Om dialogen
            </Link>
        </>
    );
}
