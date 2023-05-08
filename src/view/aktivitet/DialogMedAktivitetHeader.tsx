import { Detail, Heading, Link } from '@navikt/ds-react';
import React from 'react';

import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/aktivitetTypes';
import { formaterDate, getKlokkeslett } from '../../utils/Date';
import { StringOrNull } from '../../utils/Typer';
import { findAktivitet, useAktivitetContext } from '../AktivitetProvider';
import { TilbakeKnapp } from '../dialog/TilbakeKnapp';
import { useFnrContext } from '../Provider';
import { aktivitetLenke, visAktivitetsplan } from './AktivitetskortLenke';
import { getTypeTextByAktivitet } from './TextUtils';

interface Props {
    aktivitetId?: StringOrNull;
}

export function DialogMedAktivitetHeader(props: Props) {
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
        <section aria-label="Aktivitet knyttet til dialog">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex flex-row items-center gap-x-2">
                    <TilbakeKnapp className="md:hidden" />
                    <div>
                        <Heading level="2" size="small" aria-label={`${typeTekst}: ${aktivitet?.tittel}`}>
                            {aktivitet?.tittel}
                        </Heading>
                        {infotekst && <Detail>{infotekst}</Detail>}
                    </div>
                </div>
                <div className="flex flex-row md:flex-col items-center justify-between md:items-end">
                    <Detail aria-hidden="true">{typeTekst.toUpperCase()}</Detail>
                    <Link href={aktivitetLenke(aktivitet.id)} onClick={visAktivitetsplan(aktivitet.id, fnr)}>
                        Gå til aktiviteten
                    </Link>
                </div>
            </div>
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
