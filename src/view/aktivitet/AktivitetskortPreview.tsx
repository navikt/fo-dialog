import React from 'react';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/AktivitetTypes';
import { EtikettLiten, Systemtittel, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { formaterDate, getKlokkeslett } from '../../utils/Date';
import styles from './AktivitetskortPreview.module.less';
import { getTypeText } from './TextUtils';
import { aktivitetLenke, visAktivitetsplan } from './AktivitetskortLinke';
import { useFnrContext } from '../Provider';
import { StringOrNull } from '../../utils/Typer';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import useApiBasePath from '../../utils/UseApiBasePath';
import { dialogHeaderID2 } from '../dialog/DialogHeader';

interface Props {
    aktivitetId?: StringOrNull;
}

export function AktivitetskortPreview(props: Props) {
    const { aktivitetId } = props;
    const fnr = useFnrContext();
    const aktvitetData = useAktivitetContext();
    const apiBasePath = useApiBasePath();

    const aktivitet = findAktivitet(aktvitetData, aktivitetId);

    if (!aktivitet) {
        return null;
    }

    const typeTekst = getTypeText(aktivitet.type);
    const infotekst = getInfoText(aktivitet);

    return (
        <section aria-label="Aktivitet knyttet til dialog" className={styles.aktivitetSeksjon}>
            <Systemtittel className="visually-hidden">Aktivitet knyttet til dialog</Systemtittel>
            <Undertittel className={styles.storSkjermTittel}>
                {typeTekst}: {aktivitet?.tittel}
            </Undertittel>
            <LenkepanelBase
                href={aktivitetLenke(apiBasePath, aktivitet.id)}
                className={styles.lenkepanelbase}
                onClick={visAktivitetsplan(aktivitet.id, fnr)}
            >
                <div className={styles.aktivteskortWrapper}>
                    <div className={styles.info}>
                        <EtikettLiten className={styles.tittel}>{typeTekst}</EtikettLiten>
                        <Undertittel id={dialogHeaderID2} className={styles.tittel}>
                            {aktivitet.tittel}
                        </Undertittel>
                        <Undertekst className={styles.tittel}>{infotekst}</Undertekst>
                    </div>
                    <p className={styles.lesmer}>Gå til aktiviteten</p>
                </div>
            </LenkepanelBase>
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
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
            return null;
    }
}
