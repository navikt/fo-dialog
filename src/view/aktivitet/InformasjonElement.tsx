import styles from './AktivitetskortInfoBox.module.less';
import { EtikettLiten } from 'nav-frontend-typografi';
import React, { ReactNode } from 'react';
import { StringOrNull } from '../../utils/Typer';
import Tekstomrade from 'nav-frontend-tekstomrade';

interface TekstomradeProps {
    merkelapptekst: string;
    verdi?: StringOrNull;
}

export default function InformasjonElement(props: TekstomradeProps) {
    const { verdi, merkelapptekst } = props;
    if (!verdi) {
        return <InformasjonElementRaw {...props} />;
    }

    return (
        <InformasjonElementRaw merkelapptekst={merkelapptekst}>
            <Tekstomrade>{verdi}</Tekstomrade>
        </InformasjonElementRaw>
    );
}

interface PropTypes {
    merkelapptekst: string;
    children?: ReactNode;
}

export function InformasjonElementRaw(props: PropTypes) {
    const { merkelapptekst, children } = props;

    if (!children) return null;

    return (
        <div className={styles.informasjonselement}>
            <EtikettLiten children={merkelapptekst} className={styles.merkelapp} />
            {children}
        </div>
    );
}
