import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import { AktivitetTypes, AlleAktivitetTypes, ArenaAktivitetTypes } from '../../utils/aktivitetTypes';
import styles from './Aktivitetskort.module.css';

interface Props {
    aktivitetType: AlleAktivitetTypes;
}

export default function AktivitetIngress(props: Props) {
    return (
        <div className={styles.ingress}>
            <BodyShort>{getAktivitetIngress(props.aktivitetType)}</BodyShort>
        </div>
    );
}

function getAktivitetIngress(type: AlleAktivitetTypes): string {
    switch (type) {
        case AktivitetTypes.MOTE:
            return 'NAV ønsker et møte med deg. Du må gi beskjed så raskt som mulig hvis tidspunktet ikke passer.';
        case AktivitetTypes.SOKEAVTALE:
            return 'Her ser du hvor mange jobber NAV forventer at du søker. Legg inn hver stilling du søker i aktiviteten "En jobb jeg vil søke på".';
        case AktivitetTypes.SAMTALEREFERAT:
            return 'Her finner du referat fra en samtale du har hatt med NAV.';
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return 'Her finner du informasjon om et tiltak NAV har søkt deg inn på.';
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return 'Her ser du informasjon om en gruppeaktivitet NAV har meldt deg på';
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
            return 'Her ser du informasjon om en utdanningsaktivitet eller et kurs NAV har registrert at du skal gjennomføre.';
        default:
            return '';
    }
}
