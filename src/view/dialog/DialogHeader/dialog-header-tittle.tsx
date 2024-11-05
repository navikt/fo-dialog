import { Heading, Skeleton } from '@navikt/ds-react';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { useSelectedDialog } from '../../utils/useAktivitetId';
import { HandlingsType } from '../../ViewState';
import { TilbakeKnapp } from '../TilbakeKnapp';
import { Await, useMatches } from 'react-router';
import { RouteIds } from '../../../routing/routes';
import { useRootLoaderData } from '../../../routing/loaders';

export function dialogheaderTittle() {
    const dialog = useSelectedDialog();

    const loaderData = useRootLoaderData();
    const requiredData = useMemo(() => {
        return Promise.all([loaderData.aktiviteter, loaderData.arenaAktiviteter, loaderData.dialoger]);
    }, []);

    const headerRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        console.log( headerRef.current || 'test1');
        if (headerRef.current && dialog?.overskrift && HandlingsType) {
            headerRef.current.focus();
            console.log( headerRef.current || 'test2');
        }
    },[headerRef.current, dialog?.overskrift]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Suspense fallback={<HeaderFallback />}>
            <Await resolve={requiredData}>
                <div className="flex flex-col gap-x-4 border-b border-border-divider bg-white py-1">
                    <section aria-label="Dialog header">
                            <div className="flex flex-row gap-x-2 pl-4">
                                <TilbakeKnapp className="md:hidden" />
                                <Heading ref={headerRef}  id="mt_main_heading" level="1" size="small" tabIndex={-1}>
                                    {dialog?.overskrift}
                                </Heading>
                            </div>
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



