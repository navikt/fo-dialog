import classNames from 'classnames';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Lukk } from '../../fellesikoner/lukk.svg';
import styles from './DialogHeader.module.less';
import { TilbakeKnapp } from './TilbakeKnapp';

export function TittelHeader(props: { children?: string }) {
    const Tittel = () => (
        <div className={styles.headerContent}>
            <Systemtittel className={styles.tittel}>{props.children ?? ''}</Systemtittel>
        </div>
    );

    const LukkKnapp = () => (
        <Link to="/" title="lukk" className={styles.lukkeknapp}>
            <Lukk />
        </Link>
    );

    return (
        <div className={classNames(styles.dialogHeader, styles.tittelHeader)}>
            <TilbakeKnapp />
            <Tittel />
            <LukkKnapp />
        </div>
    );
}
