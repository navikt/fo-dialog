import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { AktivitetskortPreview } from '../aktivitet/AktivitetskortPreview';
import { Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './DialogHeader.module.less';

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
        <Undertittel id="dialog_header_2" className={styles.tittel}>
            {props.tekst}
        </Undertittel>
    );
}

export function DialogHeader(props: DialogHeaderProps) {
    const { dialog, aktivitetId } = props;
    const aktivitet = aktivitetId || dialog?.aktivitetId;
    const headerStyle = classNames(
        styles.dialogHeader,
        aktivitet ? styles.skjulVedStorSkjem : styles.skjulVedMiddelsSkjem
    );

    return (
        <div className={headerStyle}>
            <Link to="/" className={styles.tilbakeTilOversikt}>
                <VenstreChevron stor />
                Til dialoger
            </Link>
            <div id="dialog_header_1" className="hide">
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
