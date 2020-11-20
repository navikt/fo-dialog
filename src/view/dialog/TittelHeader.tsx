import classNames from 'classnames';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Lukk } from '../../fellesikoner/lukk.svg';
import styles from './DialogHeader.module.less';

export function TittelHeader(props: { children?: string }) {
    return (
        <div className={classNames(styles.dialogHeader, styles.tittelHeader)}>
            <Link to="/" title="Til dialoger" className={styles.tilbakeTilOversikt}>
                <VenstreChevron stor />
            </Link>
            <div className={styles.headerContent}>
                <Systemtittel className={styles.tittel}>{props.children ?? ''}</Systemtittel>
            </div>
            <Link to="/" title="lukk" className={styles.lukkeknapp}>
                <Lukk />
            </Link>
        </div>
    );
}
