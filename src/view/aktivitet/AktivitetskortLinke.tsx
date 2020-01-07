import styles from './Aktivitetskort.module.less';
import Lenke from 'nav-frontend-lenker';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import React from 'react';

export const aktivitetLenke = (aktivitetId: string) => `/aktivitetsplan/aktivitet/vis/${aktivitetId}`;

interface Props {
    aktivitetId: string;
}

export default function AktivitetskortLenke(props: Props) {
    return (
        <div className={styles.aktivitetkortlenke}>
            <Element>
                <Lenke href={aktivitetLenke(props.aktivitetId)}>
                    Les mer i aktivitetsplanen
                    <HoyreChevron />
                </Lenke>
            </Element>
        </div>
    );
}
