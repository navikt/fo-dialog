import { Tag } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import styles from './avtalt-markering.module.less';
import EtikettBase from './etikett-base';

interface Props {
    hidden?: boolean;
}

function AvtaltMarkering(props: Props) {
    const { hidden } = props;

    if (hidden) return null;
    return <Tag variant="info">Avtalt med NAV</Tag>;
}

export default AvtaltMarkering;
