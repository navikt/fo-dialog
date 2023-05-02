import { ChatElipsisIcon, TasklistIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import React from 'react';

import { DialogData } from '../../../utils/Typer';
import styles from './Ikon.module.less';

interface IkonProps {
    dialog: DialogData;
}

const DialogPreviewIkon = (props: IkonProps) => {
    const erAktivitet: boolean = props.dialog.aktivitetId !== null;
    const ikonCls = classNames('relative shrink-0 basis-6 mr-2 self-center', {
        [styles.ulestIkon]: !props.dialog.lest && !props.dialog.historisk
    });
    if (erAktivitet) {
        return (
            <div aria-hidden="true" className={ikonCls}>
                <TasklistIcon className="w-6 h-6" />
            </div>
        );
    }
    return (
        <div aria-hidden="true" className={ikonCls}>
            <ChatElipsisIcon className="w-6 h-6" />
        </div>
    );
};

export default DialogPreviewIkon;
