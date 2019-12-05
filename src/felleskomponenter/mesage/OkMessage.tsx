import React from 'react';
import { ReactComponent as OkIcon } from './ok.svg';
import styles from './OkMessage.module.less';

interface Props {
    children: React.ReactNode;
}

export function OkMessage(props: Props) {
    return (
        <div className={styles.container}>
            <OkIcon className={styles.icon} />
            {props.children}
        </div>
    );
}

export default OkMessage;
