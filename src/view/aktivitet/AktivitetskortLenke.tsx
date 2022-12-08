import { HoyreChevron } from 'nav-frontend-chevron';
import { Element } from 'nav-frontend-typografi';
import React, { MouseEvent } from 'react';

import { apiBasePath } from '../../utils/UseApiBasePath';
import { useFnrContext } from '../Provider';
import { getContextPath } from '../utils/utils';
import styles from './Aktivitetskort.module.less';

export const aktivitetLenke = (apiBasePath: string, aktivitetId: string) =>
    `${apiBasePath}/aktivitetsplan/aktivitet/vis/${aktivitetId}`;

export const visAktivitetsplan = (aktivitetID: string, fnrContext?: string) => (event: MouseEvent) => {
    if (!fnrContext) {
        return;
    }
    event.preventDefault();
    window.history.replaceState({}, 'aktivitetsplan', `${getContextPath()}/${fnrContext}/aktivitet/vis/${aktivitetID}`);
    window.dispatchEvent(new CustomEvent('visAktivitetsplan', { detail: aktivitetID }));
};

interface Props {
    aktivitetId: string;
}

export default function AktivitetskortLenke(props: Props) {
    const fnr = useFnrContext();
    const aktivitetId = props.aktivitetId;
    return (
        <div className={styles.aktivitetkortlenke}>
            <Element>
                <a
                    className={styles.flatLenke}
                    href={aktivitetLenke(apiBasePath, aktivitetId)}
                    onClick={visAktivitetsplan(aktivitetId, fnr)}
                >
                    Gå til aktiviteten
                    <HoyreChevron />
                </a>
            </Element>
        </div>
    );
}
