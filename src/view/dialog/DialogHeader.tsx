import { hasError } from '@nutgaard/use-fetch';
import classNames from 'classnames';
import { VenstreChevron } from 'nav-frontend-chevron';
import React from 'react';
import { Link } from 'react-router-dom';

import { DialogData, StringOrNull } from '../../utils/Typer';
import { AktivitetContextType, useAktivitetContext } from '../AktivitetProvider';
import styles from './DialogHeader.module.less';
import DialogHeaderFeil from './DialogHeaderFeil';
import { HeaderInnhold } from './HeaderInnhold';

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
    const aktivitetID = aktivitetId || dialog?.aktivitetId;

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, aktivitetID);
    const viseAktivitet = !!aktivitetID && !erFeil;

    const TilbakeKnapp = () => (
        <Link to="/" title="Til dialoger" className={styles.tilbakeTilOversikt}>
            <VenstreChevron stor />
        </Link>
    );

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <div className={classNames(styles.dialogHeader, { [styles.dialogHeaderShadow]: visSkygge })}>
                <TilbakeKnapp />
                <HeaderInnhold
                    viseAktivitet={viseAktivitet}
                    aktivitetId={aktivitetID}
                    dialogOverskrift={dialog?.overskrift}
                />
            </div>
        </>
    );
}
