import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';

import { DialogMedAktivitetHeader } from '../aktivitet/DialogMedAktivitetHeader';
import { harAktivitetDataFeil, useAktivitetContext } from '../AktivitetProvider';
import { useCompactMode } from '../../featureToggle/FeatureToggleProvider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { erArenaAktivitet } from '../utils/utils';
import DialogHeaderFeil from './DialogHeaderFeil';
import { TilbakeKnapp } from './TilbakeKnapp';

export function DialogHeader() {
    const compactMode = useCompactMode();
    const dialog = useSelectedDialog();
    const aktivitetId = dialog?.aktivitetId;
    const isNyRoute = useLocation().pathname === '/ny';

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, erArenaAktivitet(aktivitetId));
    const viseAktivitet = !!aktivitetId && !erFeil;

    if (isNyRoute) {
        return (
            <div
                className={classNames('flex items-center gap-x-4 border-b border-border-divider bg-white', {
                    'p-4 pl-6 md:pl-8': !compactMode,
                    'p-1.5 pl-4': compactMode
                })}
            >
                <TilbakeKnapp className="md:hidden" />
                <Heading level="1" size={compactMode ? 'small' : 'medium'}>
                    Start en ny dialog
                </Heading>
            </div>
        );
    }
    if (!dialog) return null;

    return (
        <>
            <DialogHeaderFeil visible={erFeil} />
            <div
                className={classNames('flex flex-col gap-x-4 border-b border-border-divider bg-white', {
                    'py-1': compactMode,
                    'py-2': !compactMode
                })}
            >
                <section aria-label="Dialog header">
                    {viseAktivitet ? (
                        <DialogMedAktivitetHeader />
                    ) : (
                        <div className={classNames('flex flex-row gap-x-2 pl-4', { 'py-2': !compactMode })}>
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
