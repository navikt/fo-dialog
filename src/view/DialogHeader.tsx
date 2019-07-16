import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { DialogData } from '../utils/typer';
import { AktivitetskortPreview } from './AktivitetskortPreview';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    dialog: DialogData;
}

export function DialogHeader(props: Props) {
    return (
        <div className="dialog__header">
            <Lenke href="#" className="tilbake-til-oversikt">
                <VenstreChevron className="tilbake-til-oversikt__pilknapp" />
                Oversikt
            </Lenke>
            {props.dialog.aktivitetId == null ? (
                <Undertittel className="dialog__tittel">{props.dialog.overskrift}</Undertittel>
            ) : (
                <AktivitetskortPreview dialog={props.dialog} />
            )}
        </div>
    );
}
