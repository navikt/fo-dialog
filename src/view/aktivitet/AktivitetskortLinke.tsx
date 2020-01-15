import styles from './Aktivitetskort.module.less';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { Link } from 'react-router-dom';

export const aktivitetLenke = (aktivitetId: string) => `/aktivitet/vis/${aktivitetId}`;

export const visAktivitetsplan = () => {
    window.dispatchEvent(new Event('visAktivitetsplan'));
};

interface Props {
    aktivitetId: string;
}

//TODO fiks lenken for sluttbruker
export default function AktivitetskortLenke(props: Props) {
    return (
        <div className={styles.aktivitetkortlenke}>
            <Element>
                <Link to={aktivitetLenke(props.aktivitetId)} onClick={visAktivitetsplan} className="lenke">
                    Se og endre aktivitet
                    <HoyreChevron />
                </Link>
            </Element>
        </div>
    );
}
