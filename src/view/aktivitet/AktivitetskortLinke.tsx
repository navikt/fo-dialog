import styles from './Aktivitetskort.module.less';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import React, { MouseEvent } from 'react';
import Lenke from 'nav-frontend-lenker';
import { useErInside } from '../Provider';

export const aktivitetLenke = (aktivitetId: string) => `/aktivitetsplan/aktivitet/vis/${aktivitetId}`;

//TODO fiks lenken for sluttbruker
export const visAktivitetsplan = (aktivitetID: string, erInside: boolean) => (event: MouseEvent) => {
    if (!erInside) {
        return;
    }
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
};

interface Props {
    aktivitetId: string;
}

//TODO fiks lenken for sluttbruker
export default function AktivitetskortLenke(props: Props) {
    const erInside = useErInside();
    const aktivitetId = props.aktivitetId;
    return (
        <div className={styles.aktivitetkortlenke}>
            <Element>
                <Lenke href={aktivitetLenke(aktivitetId)} onClick={visAktivitetsplan(aktivitetId, erInside)}>
                    Se og endre aktivitet
                    <HoyreChevron />
                </Lenke>
            </Element>
        </div>
    );
}
