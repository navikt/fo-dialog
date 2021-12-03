import React from 'react';

import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/aktivitetTypes';
import BehandlingAktivitet from './BehandlingAktivitet';
import EgenAktivitet from './EgenAktivitet';
import GruppeAktivitet from './GruppeAktivitet';
import IJobbAktivitet from './IJobbAktivitet';
import MoteAktivitet from './MoteAktivitet';
import SamtalereferatAktivitet from './SamtalereferatAktivitet';
import SokeAktivitet from './SokeAktivitet';
import StillingAktivitet from './StillingAktivitet';
import StillingFraNavAktivitet from './StillingFraNavAktivitet';
import TiltakAktivitet from './TiltakAktivitet';
import UtdanningAktivitet from './UtdanningAktivitet';

interface Props {
    aktivitet: Aktivitet | ArenaAktivitet;
}

export function AktivitetskortInfoBox(props: Props) {
    const { aktivitet } = props;
    switch (aktivitet.type) {
        case AktivitetTypes.STILLING:
            return <StillingAktivitet aktivitet={aktivitet} />;
        case AktivitetTypes.MOTE:
            return <MoteAktivitet aktivitet={aktivitet} />;
        case AktivitetTypes.SOKEAVTALE:
            return <SokeAktivitet aktivitet={aktivitet} />;
        case AktivitetTypes.BEHANDLING:
            return <BehandlingAktivitet aktivitet={aktivitet} />;
        case AktivitetTypes.SAMTALEREFERAT:
            return <SamtalereferatAktivitet aktivitet={aktivitet} />;
        case AktivitetTypes.EGEN:
            return <EgenAktivitet aktivitet={aktivitet} />;
        case AktivitetTypes.IJOBB:
            return <IJobbAktivitet aktivitet={aktivitet} />;
        case AktivitetTypes.STILLING_FRA_NAV:
            return <StillingFraNavAktivitet aktivitet={aktivitet} />;
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return <GruppeAktivitet aktivitet={aktivitet} />;
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return <TiltakAktivitet aktivitet={aktivitet} />;
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
            return <UtdanningAktivitet aktivitet={aktivitet} />;

        default:
            return null;
    }
}
