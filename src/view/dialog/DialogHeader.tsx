import { hasError } from '@nutgaard/use-fetch';
import classNames from 'classnames';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Lukk } from '../../fellesikoner/lukk.svg';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { AktivitetskortPreview } from '../aktivitet/AktivitetskortPreview';
import { AktivitetContextType, useAktivitetContext } from '../AktivitetProvider';
import styles from './DialogHeader.module.less';
import DialogHeaderFeil from './DialogHeaderFeil';

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

function harAktivitetDataFeil(aktivitetData: AktivitetContextType, aktivitetId?: string | null) {
    if (!aktivitetId) return false;

    if (aktivitetId.startsWith('ARENA')) {
        return hasError(aktivitetData.arenaAktiviter);
    } else {
        return hasError(aktivitetData.aktiviteter);
    }
}

export function DialogHeader(props: DialogHeaderProps) {
    const { dialog, aktivitetId, visSkygge } = props;
    const aktivitet = aktivitetId || dialog?.aktivitetId;

    const aktvitetData = useAktivitetContext();

    const erFeil = harAktivitetDataFeil(aktvitetData, aktivitet);

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <Header visSkygge={visSkygge}>
                <div id={dialogHeaderID1} className="hide">
                    Dialog om:
                </div>
                {aktivitet && !erFeil ? (
                    <AktivitetskortPreview aktivitetId={aktivitet} />
                ) : (
                    <DialogOverskrift tekst={dialog?.overskrift} />
                )}
            </Header>
        </>
    );
}

function Header(props: { children?: React.ReactNode; visSkygge?: boolean; className?: string }) {
    const { children, visSkygge, className } = props;
    return (
        <div className={styles.dialogHeaderContainer}>
            <div className={classNames(styles.dialogHeader, { [styles.dialogHeaderShadow]: visSkygge }, className)}>
                <Link to="/" title="Til dialoger" className={styles.tilbakeTilOversikt}>
                    <VenstreChevron stor />
                </Link>
                <div className={styles.headerContent}>{children}</div>
            </div>
        </div>
    );
}

export function TittelHeader(props: { children?: string }) {
    return (
        <div className={classNames(styles.dialogHeader, styles.tittelHeader)}>
            <Link to="/" title="Til dialoger" className={styles.tilbakeTilOversikt}>
                <VenstreChevron stor />
            </Link>
            <div className={styles.headerContent}>
                <Systemtittel className={styles.tittel}>{props.children ?? ''}</Systemtittel>
            </div>
            <Link to="/" title="lukk" className={styles.lukkeknapp}>
                <Lukk />
            </Link>
        </div>
    );
}
