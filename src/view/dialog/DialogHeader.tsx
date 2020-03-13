import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { AktivitetskortPreview } from '../aktivitet/AktivitetskortPreview';
import { Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import styles from './DialogHeader.module.less';

export const dialogHeaderID1 = 'dialog_header_1';
export const dialogHeaderID2 = 'dialog_header_2';

interface DialogHeaderProps {
    dialog?: DialogData;
    aktivitetId?: StringOrNull;
}

interface DialogOverskriftProps {
    tekst?: StringOrNull;
}

function DialogOverskrift(props: DialogOverskriftProps) {
    if (!props.tekst) {
        return null;
    }

    return (
        <Undertittel id={dialogHeaderID2} className={styles.tittel}>
            {props.tekst}
        </Undertittel>
    );
}

export function DialogHeader(props: DialogHeaderProps) {
    const { dialog, aktivitetId } = props;
    const aktivitet = aktivitetId || dialog?.aktivitetId;

    return (
        <div className={styles.dialogHeader}>
            <Link to="/" title="Til dialoger" className={styles.skjulVedMiddelsSkjem}>
                <VenstreChevron stor />
            </Link>
            <div id={dialogHeaderID1} className="hide">
                Dialog om:
            </div>
            {aktivitet ? (
                <AktivitetskortPreview aktivitetId={aktivitet} />
            ) : (
                <DialogOverskrift tekst={dialog?.overskrift} />
            )}
        </div>
    );
}
