import { Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useEffect, useRef } from 'react';
interface Props {
    tittel: string | null | undefined;
    ariaLabel?: string;
}

export const DialogTittel: FunctionComponent<Props> = ({ tittel, ariaLabel }) => {
    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (headerRef.current && tittel) {
            headerRef.current.focus();
        }
    }, [tittel]);

    if (!tittel) {
        return null;
    }

    return (
        <Heading
            ref={headerRef}
            id="mt_main_heading"
            aria-label={ariaLabel ? ariaLabel : tittel}
            level="1"
            size="small"
            tabIndex={-1}
        >
            {tittel}
        </Heading>
    );
};
