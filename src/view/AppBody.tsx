import React, { useEffect } from 'react';
import { dataOrUndefined, useOppfolgingContext, useUserInfoContext } from './Provider';
import DialogContainer from './dialog/DialogContainer';
import AktivitetContainer from './aktivitet/AktivitetContainer';
import DialogOversiktContainer from './dialogliste/DialogOversiktContainer';
import styles from './App.module.less';
import { Bruker, OppfolgingData } from '../utils/Typer';
import loggEvent from '../felleskomponenter/logging';
import shajs from 'sha.js';
import { v4 as uuidv4 } from 'uuid';

function hash(string: string): string {
    return shajs('sha256')
        .update(string)
        .digest('hex');
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

export default function AppBody() {
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
        <div className={styles.app__body}>
            <DialogOversiktContainer />
            <DialogContainer />
            <AktivitetContainer />
        </div>
    );
}
