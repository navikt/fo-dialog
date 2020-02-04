import React from 'react';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { Link } from 'react-router-dom';
import { ReactComponent as PlussIkon } from './pluss.svg';
import styles from './NyDialogLink.module.less';
import classNames from 'classnames';

export function NyDialogLink(props: { className?: string }) {
    const headerstyle = classNames(styles.header, props.className);
    return (
        <div className={headerstyle}>
            <div className={styles.panel}>
                <Link className={styles.dialogKnapp} to={'/ny'}>
                    <PlussIkon className={styles.plusslogo} />
                    Ny dialog
                </Link>
            </div>
        </div>
    );
}

export default visibleIfHoc(NyDialogLink);
