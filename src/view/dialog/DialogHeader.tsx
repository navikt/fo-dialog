import { Heading, Skeleton } from '@navikt/ds-react';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Await, useMatches } from 'react-router';
import { DialogMedAktivitetHeader } from '../aktivitet/DialogMedAktivitetHeader';
import { harAktivitetDataFeil, useAktivitetContext } from '../AktivitetProvider';
import { useSelectedDialog } from '../utils/useAktivitetId';
import { erArenaAktivitet } from '../utils/utils';
import { TilbakeKnapp } from './TilbakeKnapp';
import { useRootLoaderData } from '../../routing/loaders';
import { RouteIds } from '../../routing/routes';

export function DialogHeader() {
    const dialog = useSelectedDialog();
    const aktivitetId = dialog?.aktivitetId;

    const aktivitetData = useAktivitetContext();
    const erFeil = harAktivitetDataFeil(aktivitetData, erArenaAktivitet(aktivitetId));
    const viseAktivitet = !!aktivitetId && !erFeil;

    const loaderData = useRootLoaderData();
    const requiredData = useMemo(() => {
        return Promise.all([loaderData.aktiviteter, loaderData.arenaAktiviteter, loaderData.dialoger]);
    }, []);

   const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        console.log('Fokusert på 333333');
        if (headerRef.current) {
            headerRef.current.focus();
            console.log('Fokusert på header');
        }
    }, [headerRef.current, viseAktivitet]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Suspense fallback={<HeaderFallback />}>
            <Await resolve={requiredData}>
                <div className="flex flex-col gap-x-4 border-b border-border-divider bg-white py-1">
                    <section aria-label="Dialog header">
                        {viseAktivitet ? (
                            <DialogMedAktivitetHeader />
                        ) : (
                            <div className="flex flex-row gap-x-2 pl-4">
                                <TilbakeKnapp className="md:hidden" />
                                <Heading ref={headerRef}  id="mt_main_heading" level="1" size="small" tabIndex={-1}>
                                    {dialog?.overskrift}
                                </Heading>
                            </div>
                        )}
                    </section>
                </div>
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
