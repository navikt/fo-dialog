import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import styles from './KoronaInfo.module.less';

interface Props {
    hidden?: boolean;
    className?: string;
}

export function KoronaInfo(props: Props) {
    if (props.hidden === true) {
        return null;
    }

    const cls = props.className ? props.className : styles.info;
    return (
        <AlertStripeInfo className={cls}>
            <Normaltekst>Svartiden kan bli lenger enn vanlig på grunn av situasjonen rundt korona.</Normaltekst>
        </AlertStripeInfo>
    );
}
