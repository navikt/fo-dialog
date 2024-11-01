import { Tag } from '@navikt/ds-react';
import React from 'react';

interface Props {
    visible: boolean;
    className?: string;
}

interface VenterSvarFraBrukerProps {
    visible: boolean;
    erVeileder: boolean;
}

export function VenterSvarFraBruker(props: VenterSvarFraBrukerProps) {
    const tekst = props.erVeileder ? 'Venter på svar fra bruker' : 'Venter på svar fra deg';
    if (!props.visible) return null;
    return (
        <Tag variant="warning" size="small">
            {tekst}
        </Tag>
    );
}

export function VenterSvarFraNAV(props: Props) {
    if (!props.visible) return null;
    return (
        <Tag variant="info" size="small">
            Venter på svar fra Nav
        </Tag>
    );
}

export function ViktigMelding(props: { visible: boolean }) {
    if (!props.visible) return null;
    return (
        <Tag variant="error" size="small">
            Viktig melding
        </Tag>
    );
}
