import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useLocation } from 'react-router';

import { DialogData, StringOrNull } from '../../utils/Typer';
import { DialogMedAktivitetHeader } from '../aktivitet/DialogMedAktivitetHeader';
import { harAktivitetDataFeil, useAktivitetContext } from '../AktivitetProvider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { erArenaAktivitet } from '../utils/utils';
import DialogHeaderFeil from './DialogHeaderFeil';
import { TilbakeKnapp } from './TilbakeKnapp';

export const dialogHeaderID1 = 'dialog_header_1';
export const dialogHeaderID2 = 'dialog_header_2';

export function DialogHeader() {
    const dialog = useSelectedDialog();
    const aktivitetId = dialog?.aktivitetId;
    const isNyRoute = useLocation().pathname === '/ny';

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, erArenaAktivitet(aktivitetId));
    const viseAktivitet = !!aktivitetId && !erFeil;

    if (isNyRoute) {
        return (
            <div className="bg-white p-4 pl-6 md:pl-8 flex items-center gap-x-4 border-b border-border-divider">
                <TilbakeKnapp className="md:hidden" />
                <Heading level="1" size="medium">
                    Start en ny dialog
                </Heading>
            </div>
        );
    }
    if (!dialog) return null;

    const UUMarkering = () => (
        <div id={dialogHeaderID1} className="hidden">
            Dialog om:
        </div>
    );

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <div className="bg-white py-2 flex flex-col gap-x-4 border-b border-border-divider">
                <UUMarkering />
                {viseAktivitet ? (
                    <DialogMedAktivitetHeader />
                ) : (
                    <div className="pl-2 py-2 flex flex-row gap-x-2">
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
