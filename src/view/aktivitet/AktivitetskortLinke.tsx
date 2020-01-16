import styles from './Aktivitetskort.module.less';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import React, { MouseEvent } from 'react';
import Lenke from 'nav-frontend-lenker';

//TODO fiks lenken for sluttbruker
export const aktivitetLenke = (aktivitetId: string) => `/aktivitet/vis/${aktivitetId}`;

//TODO fiks lenken for sluttbruker
export const visAktivitetsplan = (aktivitetID: string) => (event: MouseEvent) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
};

interface Props {
    aktivitetId: string;
}

//TODO fiks lenken for sluttbruker
export default function AktivitetskortLenke(props: Props) {
    const aktivitetId = props.aktivitetId;
    return (
        <div className={styles.aktivitetkortlenke}>
            <Element>
                <Lenke href={aktivitetLenke(aktivitetId)} onClick={visAktivitetsplan(aktivitetId)} className="lenke">
                    Se og endre aktivitet
                    <HoyreChevron />
                </Lenke>
            </Element>
        </div>
    );
}
