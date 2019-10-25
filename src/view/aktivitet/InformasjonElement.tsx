import styles from './AktivitetskortInfoBox.module.less';
import { EtikettLiten, Undertekst } from 'nav-frontend-typografi';
import React from 'react';
import { StringOrNull } from '../../utils/Typer';

interface PropTypes {
    merkelapptekst: string;
    verdi: StringOrNull;
}

//TODO: Fikse lenkeformattering
export default function InformasjonElement(props: PropTypes) {
    const { merkelapptekst, verdi } = props;

    if (!verdi) return null;

    return (
        <div className={styles.informasjonselement}>
            <EtikettLiten children={merkelapptekst} className={styles.merkelapp} />
            <Undertekst children={verdi} />
        </div>
    );
}
