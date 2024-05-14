import { Heading, Skeleton } from '@navikt/ds-react';
import React, { Suspense, useMemo } from 'react';
import { Await, useLocation, useMatches, useResolvedPath } from 'react-router';
import { DialogMedAktivitetHeader } from '../aktivitet/DialogMedAktivitetHeader';
import { harAktivitetDataFeil, useAktivitetContext } from '../AktivitetProvider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { erArenaAktivitet } from '../utils/utils';
import DialogHeaderFeil from './DialogHeaderFeil';
import { TilbakeKnapp } from './TilbakeKnapp';
import { useRootLoaderData } from '../../routing/loaders';
import StatusAdvarsel from '../statusAdvarsel/StatusAdvarsel';
import { RouteIds } from '../../routing/routes';

const useErBaseRoute = () => {};

export function DialogHeader() {
    const dialog = useSelectedDialog();
    const aktivitetId = dialog?.aktivitetId;
    const isNyRoute = useLocation().pathname === '/ny';

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, erArenaAktivitet(aktivitetId));
    const viseAktivitet = !!aktivitetId && !erFeil;

    const loaderData = useRootLoaderData();
    const requiredData = useMemo(() => {
        return Promise.all([loaderData.aktiviteter, loaderData.arenaAktiviteter, loaderData.dialoger]);
    }, []);

    const ikkeValgtDialogRoute = useMatches().some((match) => match.id == RouteIds.IkkeValgtDialog);

    if (ikkeValgtDialogRoute) {
        return null;
    }

    if (isNyRoute) {
        return (
            <div>
                <div className="flex items-center gap-x-4 border-b border-border-divider bg-white p-1.5 pl-4">
                    <TilbakeKnapp className="md:hidden" />
                    <Heading level="1" size="small">
                        Start en ny dialog
                    </Heading>
                </div>
                <StatusAdvarsel />
            </div>
        );
    }

    return (
        <Suspense fallback={<HeaderFallback />}>
            <Await resolve={requiredData}>
                <StatusAdvarsel />
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
                <DialogHeaderFeil visible={erFeil} />
            </Await>
        </Suspense>
    );
}

const HeaderFallback = () => {
    const ikkeValgtDialogRoute = useMatches().some((match) => match.id == RouteIds.IkkeValgtDialog);
    if (ikkeValgtDialogRoute) return null;
    return (
        <div className="flex flex-col gap-x-4 border-b border-border-divider bg-white py-1">
            <section aria-label="Dialog header">
                <div className="flex flex-row gap-x-2 pl-4">
                    <TilbakeKnapp className="md:hidden" />
                    <Heading as={Skeleton} level="1" size="small">
                        {'Tittel her'}
                    </Heading>
                </div>
            </section>
        </div>
    );
};
