import { BodyShort } from '@navikt/ds-react';
import React from 'react';

import { AktivitetTypes, AlleAktivitetTypes, ArenaAktivitetTypes } from '../../utils/aktivitetTypes';
import styles from './Aktivitetskort.module.less';

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
            return 'Nav ønsker et møte med deg. Du må gi beskjed så raskt som mulig hvis tidspunktet ikke passer.';
        case AktivitetTypes.SOKEAVTALE:
            return 'Her ser du hvor mange jobber Nav forventer at du søker. Legg inn hver stilling du søker i aktiviteten "En jobb jeg vil søke på".';
        case AktivitetTypes.SAMTALEREFERAT:
            return 'Her finner du referat fra en samtale du har hatt med Nav.';
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
            return 'Her finner du informasjon om et tiltak Nav har søkt deg inn på.';
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return 'Her ser du informasjon om en gruppeaktivitet Nav har meldt deg på';
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
            return 'Her ser du informasjon om en utdanningsaktivitet eller et kurs Nav har registrert at du skal gjennomføre.';
        default:
            return '';
    }
}
