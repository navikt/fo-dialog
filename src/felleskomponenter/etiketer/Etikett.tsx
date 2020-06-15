import React from 'react';
import styles from './Etiketter.module.less';
import classNames from 'classnames';

interface Props {
    visible: boolean;
    className?: string;
}

interface VenterSvarFraBrukerProps {
    visible: boolean;
    erVeileder: boolean;
}

interface EtiketProps {
    visible: boolean;
    children: string;
    clasName: string;
}

function Etiket(props: EtiketProps) {
    if (!props.visible) {
        return null;
    }
    const classname = classNames(styles.etikett, props.clasName);
    return <div className={classname}>{props.children}</div>;
}

export function VenterSvarFraBruker(props: VenterSvarFraBrukerProps) {
    const tekst = props.erVeileder ? 'Venter på svar fra bruker' : 'Venter på svar fra deg';

    return (
        <Etiket visible={props.visible} clasName={styles.venterPaBruker}>
            {tekst}
        </Etiket>
    );
}

export function VenterSvarFraNAV(props: Props) {
    return (
        <Etiket visible={props.visible} clasName={styles.venterPaNav}>
            Venter på svar fra NAV
        </Etiket>
    );
}

export function ViktigMelding(props: Props) {
    const cls = classNames(styles.viktigMelding, props.className);
    return (
        <Etiket visible={props.visible} clasName={cls}>
            Viktig melding
        </Etiket>
    );
}
