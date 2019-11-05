import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { AktivitetskortPreview } from '../aktivitet/AktivitetskortPreview';
import { Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './DialogHeader.module.less';

interface DialogHeaderProps {
    dialog: DialogData;
}

interface DialogOverskriftProps {
    tekst: StringOrNull;
}

function DialogOverskrift(props: DialogOverskriftProps) {
    return <Undertittel className={styles.tittel}>{props.tekst}</Undertittel>;
}

export function DialogHeader(props: DialogHeaderProps) {
    const { dialog } = props;
    const { aktivitetId } = dialog;
    const headerStyle = classNames(
        styles.dialogHeader,
        aktivitetId ? styles.skjulVedStorSkjem : styles.skjulVedMiddelsSkjem
    );

    return (
        <div className={headerStyle}>
            <Link to="/" className={styles.tilbakeTilOversikt}>
                <VenstreChevron />
                Oversikt
            </Link>
            {aktivitetId ? <AktivitetskortPreview dialog={dialog} /> : <DialogOverskrift tekst={dialog.overskrift} />}
        </div>
    );
}
