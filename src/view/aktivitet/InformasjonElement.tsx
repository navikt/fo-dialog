import { BodyShort, Textarea } from '@navikt/ds-react';
import React, { ReactNode } from 'react';

import EksternLenke from '../../felleskomponenter/EksternLenke';
import { StringOrNull } from '../../utils/Typer';
import styles from './AktivitetskortInfoBox.module.less';

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
            <Textarea label={'FIX LABEL'} className={styles.overflowEllipse}>
                {verdi}
            </Textarea>
        </InformasjonElementRaw>
    );
}

export function LenkeInformasjonElement(props: TekstomradeProps) {
    const { verdi, merkelapptekst } = props;
    if (!verdi) {
        return <InformasjonElementRaw {...props} />;
    }

    return (
        <InformasjonElementRaw merkelapptekst={merkelapptekst}>
            <EksternLenke lenke={verdi} />
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
            <BodyShort children={merkelapptekst} className={styles.merkelapp} />
            {children}
        </div>
    );
}
