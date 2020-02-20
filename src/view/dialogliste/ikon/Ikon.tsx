import classNames from 'classnames';
import styles from './Ikon.module.less';
import React from 'react';
import { DialogData } from '../../../utils/Typer';
import DialogAktivitetIkon from './DialogAktivitetIkon';
import DialogSnakkebobleIkon from './DialogSnakkebobleIkon';

interface IkonProps {
    dialog: DialogData;
}

function DialogPreviewIkon(props: IkonProps) {
    const lest = props.dialog.lest;
    const erAktivitet = props.dialog.aktivitetId !== null;
    const ikonCls = classNames(styles.ikon, { [styles.lestIkon]: !lest });
    if (erAktivitet) {
        return (
            <div className={ikonCls}>
                <DialogAktivitetIkon lest={lest} />
            </div>
        );
    }
    return (
        <div className={ikonCls}>
            <DialogSnakkebobleIkon lest={lest} />
        </div>
    );
}

export default DialogPreviewIkon;
