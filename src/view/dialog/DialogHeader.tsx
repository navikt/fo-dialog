import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useLocation } from 'react-router';
import { DialogMedAktivitetHeader } from '../aktivitet/DialogMedAktivitetHeader';
import { harAktivitetDataFeil, useAktivitetContext } from '../AktivitetProvider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { erArenaAktivitet } from '../utils/utils';
import DialogHeaderFeil from './DialogHeaderFeil';
import { TilbakeKnapp } from './TilbakeKnapp';

export function DialogHeader() {
    const dialog = useSelectedDialog();
    const aktivitetId = dialog?.aktivitetId;
    const isNyRoute = useLocation().pathname === '/ny';

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, erArenaAktivitet(aktivitetId));
    const viseAktivitet = !!aktivitetId && !erFeil;

    if (isNyRoute) {
        return (
            <div className="flex items-center gap-x-4 border-b border-border-divider bg-white p-1.5 pl-4">
                <TilbakeKnapp className="md:hidden" />
                <Heading level="1" size="small">
                    Start en ny dialog
                </Heading>
            </div>
        );
    }
    if (!dialog) return null;

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <div className="flex flex-col gap-x-4 border-b border-border-divider bg-white py-1">
                <section aria-label="Dialog header">
                    {viseAktivitet ? (
                        <DialogMedAktivitetHeader />
                    ) : (
                        <div className="flex flex-row gap-x-2 pl-4">
                            <TilbakeKnapp className="md:hidden" />
                            <Heading level="1" size="small">
                                {dialog?.overskrift}
                            </Heading>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
