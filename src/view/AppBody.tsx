import React, { ReactElement, Suspense, useEffect, useMemo } from 'react';
import { Await, Outlet } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import loggEvent from '../felleskomponenter/logging';
import { Bruker, OppfolgingData } from '../utils/Typer';
import { useUserInfoContext } from './BrukerProvider';
import DialogOversikt from './dialogliste/DialogOversikt';
import { EventHandler } from './EventHandler';
import { useOppfolgingContext } from './OppfolgingProvider';
import { dataOrUndefined } from './Provider';
import { useRootLoaderData } from '../routing/loaders';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import DialogHeaderFeil from './dialog/DialogHeaderFeil';
import { Breakpoint, useBreakpoint } from './utils/useBreakpoint';

function hash(val: string) {
    const utf8 = new TextEncoder().encode(val);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}

const useLogBruker = (brukerdata: Bruker | null, oppfolgingData?: OppfolgingData) => {
    const underOppfolging = !!oppfolgingData?.underOppfolging;
    const erBruker = !!brukerdata?.erBruker;
    const aktorId = oppfolgingData?.aktorId;

    useEffect(() => {
        const unik = underOppfolging && aktorId ? hash(aktorId) : 'ikke-' + uuidv4();
        loggEvent('arbeidsrettet-dialog.besok', { erBruker, underOppfolging, unik });
    }, []);
};

const AppBody = () => {
    const oppfolgingContext = useOppfolgingContext();
    const brukerdata = useUserInfoContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);
    const breakpoint = useBreakpoint();
    const isMobile = [Breakpoint.sm, Breakpoint.initial].includes(breakpoint);

    useLogBruker(brukerdata, oppfolgingData);

    return (
        <div className="flex flex-1 flex-col">
            {isMobile ? <StatusAdvarsel /> : null}
            <div className="flex flex-1 max-h-full">
                <DialogOversikt />
                <WaitForAllData />
                <div className="flex flex-1 flex-col">
                    <div className="hidden md:flex flex-col">{!isMobile ? <StatusAdvarsel /> : null}</div>
                    <DialogHeaderFeil />
                    <Outlet />
                </div>
                <EventHandler />
            </div>
        </div>
    );
};

const WaitForAllData = (): ReactElement => {
    const loaderData = useRootLoaderData();
    const requiredData = useMemo(
        () =>
            Promise.all([
                loaderData.dialoger,
                loaderData.veilederNavn,
                loaderData.oppfolging,
                loaderData.features,
                loaderData.me,
                loaderData.aktiviteter,
                loaderData.arenaAktiviteter
            ]),
        []
    );
    return (
        <Suspense>
            <Await resolve={requiredData}>
                <LogVisit />
            </Await>
        </Suspense>
    );
};

const LogVisit = () => {
    const oppfolgingState = useOppfolgingContext();
    const brukerdata = useUserInfoContext();
    const oppfolgingData = dataOrUndefined(oppfolgingState);
    useLogBruker(brukerdata, oppfolgingData);
    return null;
};

export default AppBody;
