import { hasError } from '@nutgaard/use-fetch';
import classNames from 'classnames';
import { VenstreChevron } from 'nav-frontend-chevron';
import React from 'react';
import { Link } from 'react-router-dom';

import { DialogData, StringOrNull } from '../../utils/Typer';
import { AktivitetskortPreview } from '../aktivitet/AktivitetskortPreview';
import { AktivitetContextType, useAktivitetContext } from '../AktivitetProvider';
import styles from './DialogHeader.module.less';
import DialogHeaderFeil from './DialogHeaderFeil';
import { DialogOverskrift } from './DialogOverskrift';

export const dialogHeaderID1 = 'dialog_header_1';
export const dialogHeaderID2 = 'dialog_header_2';

interface DialogHeaderProps {
    dialog?: DialogData;
    aktivitetId?: StringOrNull;
    visSkygge?: boolean;
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

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, aktivitet);
    const viseAktivitet = aktivitet && !erFeil;

    const TilbakeKnapp = () => (
        <Link to="/" title="Til dialoger" className={styles.tilbakeTilOversikt}>
            <VenstreChevron stor />
        </Link>
    );

    const HeaderInnhold = () =>
        viseAktivitet ? (
            <AktivitetskortPreview aktivitetId={aktivitet} />
        ) : (
            <DialogOverskrift tekst={dialog?.overskrift} />
        );

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <div className={classNames(styles.dialogHeader, { [styles.dialogHeaderShadow]: visSkygge })}>
                <TilbakeKnapp />
                <div id={dialogHeaderID1} className="hide">
                    Dialog om:
                </div>
                <HeaderInnhold />
            </div>
        </>
    );
}
