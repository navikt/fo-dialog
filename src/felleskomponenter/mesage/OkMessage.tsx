import React from 'react';

import { ReactComponent as OkIcon } from './ok.svg';
import styles from './OkMessage.module.less';

interface Props {
    children: React.ReactNode;
}

export function OkMessage(props: Props) {
    return (
        <div className="border-t justify-end border-border-divider flex p-4">
            <OkIcon className={styles.icon} />
            {props.children}
        </div>
    );
}

export default OkMessage;
