import styles from './Aktivitetskort.module.less';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import React, { MouseEvent } from 'react';
import Lenke from 'nav-frontend-lenker';
import { useFnrContext } from '../Provider';

export const aktivitetLenke = (aktivitetId: string) => `/aktivitetsplan/aktivitet/vis/${aktivitetId}`;

//TODO fiks lenken for sluttbruker
export const visAktivitetsplan = (aktivitetID: string, fnrContext?: string) => (event: MouseEvent) => {
    if (!fnrContext) {
        return;
    }
    event.preventDefault();
    window.history.replaceState(
        {},
        'aktivitetsplan',
        `/veilarbpersonflatefs/${fnrContext}/aktivitet/vis/${aktivitetID}`
    );
    window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
};

interface Props {
    aktivitetId: string;
}

//TODO fiks lenken for sluttbruker
export default function AktivitetskortLenke(props: Props) {
    const fnr = useFnrContext();
    const aktivitetId = props.aktivitetId;
    return (
        <div className={styles.aktivitetkortlenke}>
            <Element>
                <Lenke href={aktivitetLenke(aktivitetId)} onClick={visAktivitetsplan(aktivitetId, fnr)}>
                    Se og endre aktivitet
                    <HoyreChevron />
                </Lenke>
            </Element>
        </div>
    );
}
