import React from 'react';

import styles from './DemoIkon.module.less';

interface Props {
    onClick: () => void;
}

export function DemoIkon(props: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={110}
            width={110}
            className={styles.demoIkon}
            onClick={props.onClick}
        >
            <polygon points="0,0 110,0 110,110" />
            <text x={40} y={10} transform="rotate(45 20,40)">
                DEMO
            </text>
        </svg>
    );
}
