import { BodyShort, Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/aktivitetTypes';
import { formaterDate, getKlokkeslett } from '../../utils/Date';
import { StringOrNull } from '../../utils/Typer';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { dialogHeaderID2 } from '../dialog/DialogHeader';
import { useFnrContext } from '../Provider';
import { aktivitetLenke, visAktivitetsplan } from './AktivitetskortLenke';
import styles from './AktivitetskortPreview.module.less';
import { getTypeTextByAktivitet } from './TextUtils';

const UndertekstVisible = visibleIfHoc(BodyShort);

interface Props {
    aktivitetId?: StringOrNull;
}

export function AktivitetskortPreview(props: Props) {
    const { aktivitetId } = props;
    const fnr = useFnrContext();
    const aktivitetData = useAktivitetContext();
    const aktivitet = findAktivitet(aktivitetData, aktivitetId);

    if (!aktivitet) {
        return null;
    }

    const typeTekst = getTypeTextByAktivitet(aktivitet);
    const infotekst = getInfoText(aktivitet);

    return (
        <section aria-label="Aktivitet knyttet til dialog" className={styles.aktivitetSeksjon}>
            <Heading level="2" className="visually-hidden">
                Aktivitet knyttet til dialog
            </Heading>
            <Heading level="3" className={styles.storSkjermTittel}>
                {typeTekst}: {aktivitet?.tittel}
            </Heading>
            <LinkPanel
                href={aktivitetLenke(aktivitet.id)}
                className={styles.lenkepanelbase}
                onClick={visAktivitetsplan(aktivitet.id, fnr)}
            >
                <div className={styles.aktivteskortWrapper}>
                    <div className={styles.info}>
                        <BodyShort className={styles.tittel}>{typeTekst}</BodyShort>
                        <Heading level="4" id={dialogHeaderID2}>
                            {aktivitet.tittel}
                        </Heading>
                        <UndertekstVisible visible={!!infotekst}>{infotekst}</UndertekstVisible>
                    </div>
                    <p className={styles.lesmer}>Gå til aktiviteten</p>
                </div>
            </LinkPanel>
        </section>
    );
}

export function getInfoText(aktivitet: Aktivitet | ArenaAktivitet): string | null {
    switch (aktivitet.type) {
        case AktivitetTypes.STILLING:
            return aktivitet.arbeidsgiver;
        case AktivitetTypes.MOTE:
            return `${formaterDate(aktivitet.fraDato)} / ${getKlokkeslett(aktivitet.fraDato)}`;
        case AktivitetTypes.SOKEAVTALE:
        case AktivitetTypes.EGEN:
            return `${formaterDate(aktivitet.fraDato)} - ${formaterDate(aktivitet.tilDato)}`;
        case AktivitetTypes.BEHANDLING:
            return aktivitet.behandlingType;
        case AktivitetTypes.SAMTALEREFERAT:
            return `${formaterDate(aktivitet.fraDato)}`;
        case AktivitetTypes.IJOBB:
            return aktivitet.ansettelsesforhold;
        case AktivitetTypes.STILLING_FRA_NAV:
            return aktivitet.beskrivelse;
        case AktivitetTypes.EKSTERN_AKTIVITET:
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return null;
    }
}
