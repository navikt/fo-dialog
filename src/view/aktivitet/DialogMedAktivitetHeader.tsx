import { BodyShort, Detail, Heading, Link, Switch } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import { Aktivitet, AktivitetTypes, ArenaAktivitet, ArenaAktivitetTypes } from '../../utils/aktivitetTypes';
import { formaterDate, getKlokkeslett } from '../../utils/Date';
import { StringOrNull } from '../../utils/Typer';
import { useVisAktivitetContext } from '../AktivitetToggleContext';
import { TilbakeKnapp } from '../dialog/TilbakeKnapp';
import { useCompactMode } from '../FeatureToggleProvider';
import { useFnrContext } from '../Provider';
import { useSelectedAktivitet } from '../utils/useAktivitetId';
import { aktivitetLenke, visAktivitetsplan } from './AktivitetskortLenke';
import { getTypeTextByAktivitet } from './TextUtils';

interface Props {
    aktivitetId?: StringOrNull;
}

export function DialogMedAktivitetHeader(props: Props) {
    const compactMode = useCompactMode();
    const aktivitet = useSelectedAktivitet();
    const { visAktivitet, setVisAktivitet } = useVisAktivitetContext();

    if (!aktivitet) {
        return null;
    }

    const typeTekst = getTypeTextByAktivitet(aktivitet);
    const infotekst = getInfoText(aktivitet);

    return (
        <div
            className={classNames('flex w-full md:flex-row', {
                'flex-col': !compactMode,
                'flex-row items-center': compactMode
            })}
        >
            <div className="flex flex-1 flex-row items-center gap-x-2 lg:max-w-lgContainer xl:max-w-none">
                <TilbakeKnapp className="md:hidden" />
                <div className={classNames('md:ml-4', { 'flex items-baseline gap-2': compactMode })}>
                    <Heading
                        className="truncate"
                        level="1"
                        size="small"
                        aria-label={`${typeTekst}: ${aktivitet?.tittel}`}
                    >
                        {aktivitet?.tittel}
                    </Heading>
                    {infotekst &&
                        (compactMode ? (
                            <BodyShort className="text-text-subtle">{infotekst}</BodyShort>
                        ) : (
                            <Detail className="">{infotekst}</Detail>
                        ))}
                </div>
            </div>
            <div
                className={classNames('', {
                    'md:max-w-[320px] xl:max-w-screen-w-1/3': !compactMode && visAktivitet,
                    'lg:flex-1': compactMode && !visAktivitet,
                    'lg:grow md:max-w-[320px] xl:max-w-screen-w-1/3 pl-4': compactMode && visAktivitet
                })}
            >
                <div
                    className={classNames('flex items-center justify-between md:mt-0 ', {
                        'flex-row pr-2 ': compactMode,
                        'mt-2 flex-row md:flex-col md:items-end lg:items-start lg:pl-4 px-2': !compactMode
                    })}
                >
                    {!compactMode && <Detail aria-hidden="true">{typeTekst.toUpperCase()}</Detail>}
                    <Link href={aktivitetLenke(aktivitet.id)} onClick={visAktivitetsplan(aktivitet.id)}>
                        Gå til aktiviteten
                    </Link>
                    {compactMode && (
                        <Switch
                            className="hidden lg:flex"
                            checked={visAktivitet}
                            value={visAktivitet.toString()}
                            onChange={(_) => {
                                setVisAktivitet(!visAktivitet);
                            }}
                            size="small"
                        >
                            Vis aktiviteten
                        </Switch>
                    )}
                </div>
            </div>
        </div>
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
