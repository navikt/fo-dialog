import classNames from 'classnames';
import styles from './Ikon.module.less';
import { ReactComponent as AktivitetsIkon } from './aktivitet-dialog-lest.svg';
import { ReactComponent as DialogIkon } from './snakkeboble.svg';
import React from 'react';
import { DialogData } from '../../../utils/Typer';

interface IkonProps {
    dialog: DialogData;
}

function DialogPreviewIkon(props: IkonProps) {
    const erAktivitet: boolean = props.dialog.aktivitetId !== null;
    const ikonCls = classNames(styles.ikon, { [styles.lestIkon]: !props.dialog.lest });
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
