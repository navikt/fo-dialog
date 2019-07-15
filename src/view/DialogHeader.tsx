import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { DialogData } from '../utils/typer';
import { DialogHeaderCheckboxes } from './DialogHeaderCheckboxes';

interface Props {
    dialog: DialogData;
}

export function DialogHeader(props: Props) {
    return (
        <>
            <Lenke href="/dialog">
                <Undertittel>
                    Aktivitet: {props.dialog.aktivitetId}
                    <HoyreChevron />
                </Undertittel>
            </Lenke>
            <DialogHeaderCheckboxes dialog={props.dialog} />
        </>
    );
}
