import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Lukk } from '../../fellesikoner/lukk.svg';
import { useRoutes } from '../../routes';
import styles from './DialogHeader.module.less';
import { TilbakeKnapp } from './TilbakeKnapp';

export function TittelHeader(props: { children: string }) {
    const Tittel = () => (
        <div className={styles.headerContent}>
            <Heading className={styles.tittel}>{props.children}</Heading>
        </div>
    );

    const { baseRoute } = useRoutes();
    const LukkKnapp = () => (
        <Link to={baseRoute()} title="lukk" className={styles.lukkeknapp}>
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
