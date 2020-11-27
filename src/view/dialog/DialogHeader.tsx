import classNames from 'classnames';
import React from 'react';

import { DialogData, StringOrNull } from '../../utils/Typer';
import { harAktivitetDataFeil, useAktivitetContext } from '../AktivitetProvider';
import { erArenaAktivitet } from '../utils/utils';
import styles from './DialogHeader.module.less';
import DialogHeaderFeil from './DialogHeaderFeil';
import { HeaderInnhold } from './HeaderInnhold';
import { TilbakeKnapp } from './TilbakeKnapp';

export const dialogHeaderID1 = 'dialog_header_1';
export const dialogHeaderID2 = 'dialog_header_2';

interface DialogHeaderProps {
    dialog?: DialogData;
    aktivitetId?: StringOrNull;
    visSkygge?: boolean;
}

export function DialogHeader(props: DialogHeaderProps) {
    const { dialog, aktivitetId, visSkygge } = props;
    const aktivitetID = aktivitetId || dialog?.aktivitetId;

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, erArenaAktivitet(aktivitetID));
    const viseAktivitet = !!aktivitetID && !erFeil;

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
