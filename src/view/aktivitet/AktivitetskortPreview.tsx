import React from 'react';
import { DialogData } from '../../utils/Typer';
import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/AktivitetTypes';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';

import UseFetch from '../../utils/UseFetch';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { formaterDate, getKlokkeslett } from '../../utils/Date';
import { aktivitetLenke } from './Aktivitetskort';
import styles from './AktivitetskortPreview.module.less';
import { getTypeText } from './TextUtils';

interface Props {
    dialog: DialogData;
}

export function AktivitetskortPreview(props: Props) {
    const fetch = UseFetch<Aktivitet[]>('/veilarbaktivitet/api/aktivitet');
    const aktiviteter = fetch.data;

    if (!aktiviteter) return null;

    const aktivitet = aktiviteter.find(aktivitet => aktivitet.id === props.dialog.aktivitetId);
    if (!aktivitet) return null;

    const info = getInfoText(aktivitet);
    return (
        <LenkepanelBase href={aktivitetLenke(aktivitet.id)} className={styles.lenkepanelbase}>
            <div>
                <Undertittel className={styles.tittel}>{aktivitet.tittel}</Undertittel>
                <Undertekst>{info}</Undertekst>
            </div>
            <p className={styles.lesmer} children="Les mer" />
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
        case ArenaAktivitetTypes.TILTAKSAKTIVITET ||
            ArenaAktivitetTypes.UTDANNINGSAKTIVITET ||
            ArenaAktivitetTypes.GRUPPEAKTIVITET ||
            AktivitetTypes.EGEN:
            return typeTekst;
    }

    return '';
}
