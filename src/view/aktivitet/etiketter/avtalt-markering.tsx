import classNames from 'classnames';
import React from 'react';

import styles from './avtalt-markering.module.less';
import EtikettBase from './etikett-base';

interface Props {
    hidden?: boolean;
    className?: string;
}

function AvtaltMarkering(props: Props) {
    const { className, hidden } = props;

    if (hidden) {
        return null;
    }
    return <EtikettBase className={classNames(styles.etikett, className)}>Avtalt med NAV</EtikettBase>;
}

export default AvtaltMarkering;
