import { Tag } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import styles from './Etiketter.module.less';

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
    return <Tag variant="info">{tekst}</Tag>;
}

export function VenterSvarFraNAV(props: Props) {
    if (!props.visible) return null;
    return <Tag variant="info">Venter på svar fra NAV</Tag>;
}

export function ViktigMelding(props: Props) {
    const cls = classNames(styles.viktigMelding, props.className);
    if (!props.visible) return null;
    return <Tag variant="info">Viktig melding</Tag>;
}
