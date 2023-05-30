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
            <div className="bg-white p-4 pl-6 md:pl-8 flex items-center gap-x-4 border-b border-border-divider">
                <TilbakeKnapp className="md:hidden" />
                <Heading level="2" size="medium">
                    Start en ny dialog
                </Heading>
            </div>
        );
    }
    if (!dialog) return null;

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <div className="bg-white py-2 flex flex-col gap-x-4 border-b border-border-divider">
                <section aria-label="Dialog header">
                    {viseAktivitet ? (
                        <DialogMedAktivitetHeader />
                    ) : (
                        <div className="pl-4 py-2 flex flex-row gap-x-2">
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
