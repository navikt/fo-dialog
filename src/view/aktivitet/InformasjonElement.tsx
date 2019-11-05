import styles from './AktivitetskortInfoBox.module.less';
import { EtikettLiten, Undertekst } from 'nav-frontend-typografi';
import React, { ReactNode } from 'react';
import { StringOrNull } from '../../utils/Typer';

interface PropTypes {
    merkelapptekst: string;
    verdi?: StringOrNull;
    children?: ReactNode;
}

export default function InformasjonElement(props: PropTypes) {
    const { merkelapptekst, verdi, children } = props;

    if (!verdi && !children) return null;

    return (
        <div className={styles.informasjonselement}>
            <EtikettLiten children={merkelapptekst} className={styles.merkelapp} />
            <Undertekst children={verdi} />
            {children}
        </div>
    );
}
