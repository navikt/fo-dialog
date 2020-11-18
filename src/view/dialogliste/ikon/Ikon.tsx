import classNames from 'classnames';
import React from 'react';

import { DialogData } from '../../../utils/Typer';
import { ReactComponent as AktivitetsIkon } from './aktivitet-dialog-lest.svg';
import styles from './Ikon.module.less';
import { ReactComponent as DialogIkon } from './snakkeboble.svg';

interface IkonProps {
    dialog: DialogData;
}

function DialogPreviewIkon(props: IkonProps) {
    const erAktivitet: boolean = props.dialog.aktivitetId !== null;
    const ikonCls = classNames(styles.ikon, { [styles.ulestIkon]: !props.dialog.lest && !props.dialog.historisk });
    if (erAktivitet) {
        return (
            <div aria-hidden="true" className={ikonCls}>
                <AktivitetsIkon />
            </div>
        );
    }
    return (
        <div aria-hidden="true" className={ikonCls}>
            <DialogIkon />
        </div>
    );
}

export default DialogPreviewIkon;
