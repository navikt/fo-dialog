import React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { AktivitetskortPreview } from '../aktivitet/AktivitetskortPreview';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './DialogHeader.module.less';

export const dialogHeaderID1 = 'dialog_header_1';
export const dialogHeaderID2 = 'dialog_header_2';

interface DialogHeaderProps {
    dialog?: DialogData;
    aktivitetId?: StringOrNull;
    visSkygge?: boolean;
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
    const { dialog, aktivitetId, visSkygge } = props;
    const aktivitet = aktivitetId || dialog?.aktivitetId;

    return (
        <Header visSkygge={visSkygge}>
            <div id={dialogHeaderID1} className="hide">
                Dialog om:
            </div>
            {aktivitet ? (
                <AktivitetskortPreview aktivitetId={aktivitet} />
            ) : (
                <DialogOverskrift tekst={dialog?.overskrift} />
            )}
        </Header>
    );
}

function Header(props: { children?: React.ReactNode; visSkygge?: boolean; className?: string }) {
    const { children, visSkygge, className } = props;
    return (
        <div className={classNames(styles.dialogHeader, { [styles.dialogHeaderShadow]: visSkygge }, className)}>
            <Link to="/" title="Til dialoger" className={styles.tilbakeTilOversikt}>
                <VenstreChevron stor />
            </Link>
            <div className={styles.hederContent}>{children}</div>
        </div>
    );
}

export function TittelHeader(props: { children?: string }) {
    return (
        <Header className={styles.tittelHeader}>
            <Systemtittel className={styles.tittel}>{props.children}</Systemtittel>
        </Header>
    );
}
