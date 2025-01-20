import { Alert } from '@navikt/ds-react';
import React from 'react';

interface Props {
    readonly children: React.ReactNode;
}

export default function StatusAdvarselWrapper({ children }: Props) {
    return (
        <Alert fullWidth variant="warning">
            {children}
        </Alert>
    );
}

export function KanIkkeKontakteElektroniskVeileder() {
    return <StatusAdvarselWrapper>Du kan ikke kontakte denne brukeren digitalt.</StatusAdvarselWrapper>;
}
