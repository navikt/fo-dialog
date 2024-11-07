import { Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
    tittel: string | null;
}

export const DialogTittel: FunctionComponent<Props> = ({ tittel }) => {
    const headerRef = useRef<HTMLHeadingElement>(null);

    const { state } = useLocation();

    if (headerRef.current && state && state.fokuspaHedear) {
        headerRef.current.focus();
        const newState = { ...state, fokuspaHedear: false };
        window.history.replaceState(newState, document.title, window.location.href);
    }
    if (!tittel) {
        return null;
    }

    return (
        <Heading ref={headerRef} id="mt_main_heading" aria-label={tittel} level="1" size="small" tabIndex={-1}>
            {tittel}
        </Heading>
    );
};
