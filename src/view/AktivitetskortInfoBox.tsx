import React from 'react';
import {Aktivitet} from '../utils/typer';
import {EtikettLiten, Ingress, Undertekst, Undertittel} from 'nav-frontend-typografi';
import {formaterDate, formaterDateAndTime, konverterMinutterTilTimer} from '../utils/date';
import {DialogOverview} from './DialogOverview';
import {element} from 'prop-types';

interface Props {
    aktivitet: Aktivitet;
}

export function AktivitetskortInfoBox(props: Props) {
    const datapunkter: Array<Array<InfoElement>> = fjernTommeRaderOgKolonner(mapAktivietTypeToInfobox(props.aktivitet));
    return (
        <>
            {datapunkter.map(rad => (
                <div className="aktivitetkort__infobox__row">
                    {rad.map(element => (
                        <div className="aktivitetkort__infobox__row__item">
                            <EtikettLiten children={element.label}/>
                            <Undertekst children={element.data}/>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

interface InfoElement {
    label: string;
    data: string;
}

type Row<T> = Array<T>;
type Column<T> = Array<T>;
type GridConfig = Array<Array<InfoElement>>;

function mapAktivietTypeToInfobox(aktivitet: Aktivitet): GridConfig {
    switch (aktivitet.type) {
        case 'STILLING':
            return [
                [
                    {label: 'Fra dato', data: formaterDate(aktivitet.fraDato)},
                    {
                        label: 'Frist',
                        data: formaterDate(aktivitet.tilDato)
                    }
                ],
                [
                    {label: 'Arbeidsgiver', data: aktivitet.arbeidsgiver!},
                    {
                        label: 'Arbeidssted',
                        data: aktivitet.arbeidssted!
                    }
                ],
                [{label: 'Beskrivelse', data: aktivitet.beskrivelse ? aktivitet.beskrivelse : ''}],
                [{label: 'Lenke', data: aktivitet.lenke ? aktivitet.lenke : ''}] //TODO: Gjøre sånn at dette er en faktisk lenke
            ];

        case 'MOTE':
            return [
                [{label: 'Dato', data: formaterDateAndTime(aktivitet.fraDato)},
                    {label: 'Varighet',data: konverterMinutterTilTimer(aktivitet.varighet!)}]]
        case 'SOKEAVTALE':
            return [
                [
                    {label: 'Fra dato', data: formaterDate(aktivitet.fraDato)},
                    {
                        label: 'Til dato',
                        data: formaterDate(aktivitet.tilDato)
                    }
                ],
                [
                    {
                        label: 'Antall søknader i perioden',
                        data: aktivitet.antallStillingerSokes!
                    },
                    {label: 'Oppfølging fra nav', data: aktivitet.oppfolging!}
                ],
                [{label: 'Beskrivelse', data: aktivitet.beskrivelse!}]
            ];
        case 'BEHANDLING':
            return [
                [
                    {label: "Type behandling",data: aktivitet.behandlingType!},
                    {label: "Behandlingssted",data: aktivitet.behandlingSted!}
                ],
                [
                    {label: 'Fra dato', data: formaterDate(aktivitet.fraDato)},
                    {
                        label: 'Til dato',
                        data: formaterDate(aktivitet.tilDato)
                    }
                ],
                [
                    {label: "Mål for behandlingen",data: aktivitet.effekt!},
                    {label: "Oppfølging fra NAV",data: aktivitet.oppfolging!}
                ],
                [
                    {label: "Beskrivelse",data: aktivitet.beskrivelse!}
                ]
            ]
    }
    return [];
}

function fjernTommeRaderOgKolonner(config: GridConfig): GridConfig {
    config = config.filter(row => row.filter(element => element.data !== '').length !== 0);

    return config;
}
