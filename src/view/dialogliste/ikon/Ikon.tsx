import { ChatElipsisIcon, TasklistIcon } from '@navikt/aksel-icons';
import React from 'react';

import { DialogData } from '../../../utils/Typer';

interface IkonProps {
    dialog: DialogData;
}

const DialogPreviewIkon = (props: IkonProps) => {
    const erAktivitet: boolean = props.dialog.aktivitetId !== null;
    const ulest = !props.dialog.lest && !props.dialog.historisk;
    return (
        <div aria-hidden="true" className="relative shrink-0 basis-6 mr-2 self-center">
            {erAktivitet ? <TasklistIcon className="w-6 h-6" /> : <ChatElipsisIcon className="w-6 h-6" />}
            {ulest ? <UlestMarkering /> : null}
        </div>
    );
};

const UlestMarkering = () => <div className="w-3 h-3 top-3 left-3 absolute bg-red-400 rounded-full"></div>;

export default DialogPreviewIkon;
