import React from 'react';
import { StringOrNull } from '../../utils/Typer';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/AktivitetTypes';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { formaterDate, getKlokkeslett } from '../../utils/Date';
import styles from './AktivitetskortPreview.module.less';
import { getTypeText } from './TextUtils';
import { useFetchAktivitetMedFnrContext } from '../../api/UseAktivitet';
import { aktivitetLenke, visAktivitetsplan } from './AktivitetskortLinke';
import { useFnrContext } from '../Provider';

interface Props {
    aktivitetId?: StringOrNull;
}

export function AktivitetskortPreview(props: Props) {
    const { findAktivitet } = useFetchAktivitetMedFnrContext();
    const fnr = useFnrContext();

    const aktivitet = findAktivitet(props.aktivitetId);
    if (!aktivitet) {
        return null;
    }

    const info = getInfoText(aktivitet);
    //TODO fiks linken for sluttbruker
    return (
        <LenkepanelBase
            href={aktivitetLenke(aktivitet.id)}
            className={styles.lenkepanelbase}
            onClick={visAktivitetsplan(aktivitet.id, fnr)}
        >
            <div className={styles.spaceBetween}>
                <div>
                    <Undertittel className={styles.tittel}>{aktivitet.tittel}</Undertittel>
                    <Undertekst>{info}</Undertekst>
                </div>
                <p className={styles.lesmer}>Se aktivitet</p>
            </div>
        </LenkepanelBase>
    );
}

export function getInfoText(aktivitet: Aktivitet | ArenaAktivitet): string {
    const typeTekst = getTypeText(aktivitet.type);

    switch (aktivitet.type) {
        case AktivitetTypes.STILLING:
            return `${typeTekst} / ${aktivitet.arbeidsgiver}`;
        case AktivitetTypes.MOTE:
            return `${typeTekst} / ${formaterDate(aktivitet.fraDato)} / ${getKlokkeslett(aktivitet.fraDato)}`;
        case AktivitetTypes.SOKEAVTALE:
            return `${formaterDate(aktivitet.fraDato)} - ${formaterDate(aktivitet.tilDato)}`;
        case AktivitetTypes.BEHANDLING:
            return aktivitet.behandlingType ? aktivitet.behandlingType : '';
        case AktivitetTypes.SAMTALEREFERAT:
            return `${typeTekst} / ${formaterDate(aktivitet.fraDato)}`;
        case AktivitetTypes.IJOBB:
            return `${typeTekst} / ${aktivitet.arbeidsgiver}`;
        case ArenaAktivitetTypes.TILTAKSAKTIVITET:
        case ArenaAktivitetTypes.UTDANNINGSAKTIVITET:
        case ArenaAktivitetTypes.GRUPPEAKTIVITET:
        case AktivitetTypes.EGEN:
            return typeTekst;
    }
}
