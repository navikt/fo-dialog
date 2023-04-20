import { ReadMore } from '@navikt/ds-react';
import React, { useState } from 'react';
// import { UnmountClosed } from 'react-collapse';

interface Props {
    apneTekst: string;
    lukkTekst: string;
    hidden?: boolean;
    children: React.ReactNode;
}

export default function InvertedLestMer(props: Props) {
    const [vis, setVis] = useState(false);
    const toggle = () => setVis(!vis);

    const { apneTekst, lukkTekst, hidden, children } = props;

    if (hidden) {
        return null;
    }

    const tekst = vis ? lukkTekst : apneTekst;

    return (
        <div className="mb-4">
            <ReadMore onClick={toggle} header={tekst}>
                {children}
            </ReadMore>
            {/*<UnmountClosed isOpened={vis}>{children}</UnmountClosed>*/}
        </div>
    );
}
