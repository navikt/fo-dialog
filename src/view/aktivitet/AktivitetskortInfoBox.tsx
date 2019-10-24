import React from 'react';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/Typer';
import StillingAktivitet from './StillingAktivitet';
import MoteAktivitet from './MoteAktivitet';
import SokeAktivitet from './SokeAktivitet';
import BehandlingAktivitet from './BehandlingAktivitet';
import SamtalereferatAktivitet from './SamtalereferatAktivitet';
import EgenAktivitet from './EgenAktivitet';
import IJobbAktivitet from './IJobbAktivitet';
import TiltakAktivitet from './TiltakAktivitet';
import UtdanningAktivitet from './UtdanningAktivitet';
import GruppeAktivitet from './GruppeAktivitet';

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
