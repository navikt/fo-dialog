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
    const ikonCls = classNames(styles.ikon, {
        [styles.ulestIkon]: !props.dialog.lest && !props.dialog.historisk
    });
    if (erAktivitet) {
        return (
            <div aria-hidden="true" className={ikonCls}>
                <AktivitetsIkon className="w-10 h-10" />
            </div>
        );
    }
    return (
        <div aria-hidden="true" className={ikonCls}>
            <DialogIkon className="w-10 h-10" />
        </div>
    );
}

export default DialogPreviewIkon;
