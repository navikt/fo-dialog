import { Heading } from '@navikt/ds-react';
import React from 'react';

import InvertedLestMer from '../../felleskomponenter/InvertedLesMer';
import { DialogData } from '../../utils/Typer';
import { useOppfolgingContext } from '../OppfolgingProvider';
import { dataOrUndefined } from '../Provider';
import styles from './DialogOversikt.module.less';
import { DialogPreviewListe } from './DialogPreview';

interface HistoriskeDialogerProps {
    historiske: DialogData[];
    valgDialog?: string;
}

interface HistoriskeDialogerTekst {
    knapptekst: string;
    tittel: string;
}

const defultTekst = {
    knapptekst: 'Se dialoger fra tidligere perioder',
    tittel: 'Dialoger fra tidligere perioder'
};

const bareKVPTekst = {
    knapptekst: 'Se dialoger fra perioden du var i Kvalifiseringsprogrammet',
    tittel: 'Dialoger fra perioden du var i Kvalifiseringsprogrammet'
};

const KVPOgHistoriskTekst = {
    knapptekst: 'Se dialoger fra tidligere perioder og fra perioden du var i Kvalifiseringsprogrammet',
    tittel: 'Dialoger fra tidligere oppfølgingsperioder og fra perioden du var i Kvalifiseringsprogrammet'
};

function useTekst(): HistoriskeDialogerTekst {
    const oppfolgingContext = useOppfolgingContext();
    const oppfolgingData = dataOrUndefined(oppfolgingContext);

    if (!oppfolgingData) {
        return defultTekst;
    }

    const underOppfolging = oppfolgingData.underOppfolging;
    const perioder = oppfolgingData.oppfolgingsPerioder;
    const naverende = perioder?.find((a) => !a.sluttDato);
    const kvpPerioder = naverende?.kvpPerioder ? naverende.kvpPerioder : [];
    const underKVP = oppfolgingData.underKvp;

    const underKVPMedAvsluttetePerioder = underKVP && kvpPerioder.length > 1;
    const avsluttetePerioderIkkeUnderKVP = !underKVP && kvpPerioder.length > 0;
    const avsluteteKvpPerioder = underKVPMedAvsluttetePerioder || avsluttetePerioderIkkeUnderKVP;

    const kvpTekst = avsluteteKvpPerioder && underOppfolging;
    const flerePerioder = perioder && perioder?.length > 1;

    if (kvpTekst && flerePerioder) {
        return KVPOgHistoriskTekst;
    }

    if (kvpTekst && !flerePerioder) {
        return bareKVPTekst;
    }

    return defultTekst;
}

function HistoriskeDialogerOversikt(props: HistoriskeDialogerProps) {
    const { historiske, valgDialog } = props;
    const { knapptekst, tittel } = useTekst();

    if (historiske.length === 0) {
        return null;
    }

    return (
        <InvertedLestMer apneTekst={knapptekst} lukkTekst="Skjul">
            <section>
                <Heading level="3">{tittel}</Heading>
                <DialogPreviewListe dialoger={historiske} valgDialog={valgDialog} />
            </section>
        </InvertedLestMer>
    );
}

export default HistoriskeDialogerOversikt;
