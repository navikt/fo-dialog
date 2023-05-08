import { Heading } from '@navikt/ds-react';
import React from 'react';

import { DialogData, StringOrNull } from '../../utils/Typer';
import { DialogMedAktivitetHeader } from '../aktivitet/DialogMedAktivitetHeader';
import { harAktivitetDataFeil, useAktivitetContext } from '../AktivitetProvider';
import { erArenaAktivitet } from '../utils/utils';
import DialogHeaderFeil from './DialogHeaderFeil';
import { TilbakeKnapp } from './TilbakeKnapp';

export const dialogHeaderID1 = 'dialog_header_1';
export const dialogHeaderID2 = 'dialog_header_2';

interface DialogHeaderProps {
    dialog?: DialogData;
    visSkygge?: boolean;
}

export function DialogHeader(props: DialogHeaderProps) {
    const { dialog } = props;
    const aktivitetId = dialog?.aktivitetId;

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, erArenaAktivitet(aktivitetId));
    const viseAktivitet = !!aktivitetId && !erFeil;

    const UUMarkering = () => (
        <div id={dialogHeaderID1} className="hidden">
            Dialog om:
        </div>
    );

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <div className="bg-white px-4 py-2  flex flex-col gap-x-4 border-b border-border-divider border-r">
                <UUMarkering />
                {viseAktivitet ? (
                    <DialogMedAktivitetHeader aktivitetId={aktivitetId} />
                ) : (
                    <div className="flex flex-row gap-x-2">
                        <TilbakeKnapp className="md:hidden" />
                        <Heading level="1" size="small">
                            {dialog?.overskrift}
                        </Heading>
                    </div>
                )}
            </div>
        </>
    );
}
