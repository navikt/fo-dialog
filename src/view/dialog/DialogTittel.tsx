import { Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
    tittel: string | null;
    ariaLabel?: string;
}

export const DialogTittel: FunctionComponent<Props> = ({ tittel, ariaLabel }) => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const { state } = useLocation();

    useEffect(() => {
    if (headerRef.current && state && state.fokuspaHedear) {
        headerRef.current.focus();
        const newState = { ...state, fokuspaHedear: false };
        window.history.replaceState(newState, document.title, window.location.href);
    }
    }, [state]);

    if (!tittel) {
        return null;
    }

    return (
        <Heading ref={headerRef} id="mt_main_heading" aria-label={ariaLabel ? ariaLabel : tittel} level="1" size="small" tabIndex={-1}>
            {tittel}
        </Heading>
    );
};
