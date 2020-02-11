import React from 'react';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/AktivitetTypes';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { formaterDate, getKlokkeslett } from '../../utils/Date';
import styles from './AktivitetskortPreview.module.less';
import { getTypeText } from './TextUtils';
import { aktivitetLenke, visAktivitetsplan } from './AktivitetskortLinke';
import { useFnrContext } from '../Provider';
import { StringOrNull } from '../../utils/Typer';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import useApiBasePath from '../../utils/UseApiBasePath';

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

    const info = getInfoText(aktivitet);

    return (
        <LenkepanelBase
            href={aktivitetLenke(apiBasePath, aktivitet.id)}
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

function tekstGuard(tekst: StringOrNull) {
    if (!!tekst) {
        return ` / ${tekst}`;
    }
    return '';
}

export function getInfoText(aktivitet: Aktivitet | ArenaAktivitet): string {
    const typeTekst = getTypeText(aktivitet.type);

    switch (aktivitet.type) {
        case AktivitetTypes.STILLING:
            return `${typeTekst}${tekstGuard(aktivitet.arbeidsgiver)}`;
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
