import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import loggEvent from '../felleskomponenter/logging';
import { Bruker, OppfolgingData } from '../utils/Typer';
import { useUserInfoContext } from './BrukerProvider';
import { DialogHeader } from './dialog/DialogHeader';
import DialogOversikt from './dialogliste/DialogOversikt';
import { EventHandler } from './EventHandler';
import { useOppfolgingContext } from './OppfolgingProvider';
import { dataOrUndefined } from './Provider';

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
    }, [underOppfolging, erBruker, aktorId]);
};

const AppBody = () => {
    const oppfolgingContext = useOppfolgingContext();
    const brukerdata = useUserInfoContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    useLogBruker(brukerdata, oppfolgingData);

    if (!oppfolgingData || !brukerdata) {
        return null;
    }

    const { underOppfolging, manuell, reservasjonKRR, oppfolgingsPerioder } = oppfolgingData;
    const erBruker = brukerdata.erBruker;

    const aldriOppfolging = !underOppfolging && oppfolgingsPerioder.length === 0;
    const manuellBruker = erBruker && manuell;
    const krrBruker = erBruker && reservasjonKRR;

    if (aldriOppfolging || manuellBruker || krrBruker) {
        return null;
    }

    return (
        <>
            <DialogOversikt />
            <div className="flex flex-1 flex-col">
                <DialogHeader />
                <div className="flex min-h-0 flex-1">
                    <Outlet />
                </div>
            </div>
            <EventHandler />
        </>
    );
};

export default AppBody;
