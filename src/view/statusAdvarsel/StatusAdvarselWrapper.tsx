import { Alert } from '@navikt/ds-react';
import React from 'react';

interface Props {
    readonly children: React.ReactNode;
}

export default function StatusAdvarselWrapper({ children }: Props) {
    return (
        <div className="flex justify-center border-b border-border-divider p-4">
            <Alert variant="warning">{children}</Alert>
        </div>
    );
}

export function KanIkkeKontakteElektroniskVeileder() {
    return <StatusAdvarselWrapper>Du kan ikke kontakte denne brukeren digitalt.</StatusAdvarselWrapper>;
}
