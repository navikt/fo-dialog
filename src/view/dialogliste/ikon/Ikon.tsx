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
        <div aria-hidden="true" className="relative mr-2 shrink-0 basis-6 self-center">
            {erAktivitet ? <TasklistIcon className="h-6 w-6" /> : <ChatElipsisIcon className="h-6 w-6" />}
            {ulest ? <UlestMarkering /> : null}
        </div>
    );
};

const UlestMarkering = () => <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-red-400"></div>;

export default DialogPreviewIkon;
