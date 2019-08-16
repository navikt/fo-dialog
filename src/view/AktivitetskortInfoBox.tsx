import React from 'react';
import { Aktivitet } from '../utils/typer';
import { EtikettLiten, Undertekst } from 'nav-frontend-typografi';
import { formaterDate } from '../utils/date';

import Lenke from 'nav-frontend-lenker';

interface Props {
    aktivitet: Aktivitet;
}

export function AktivitetskortInfoBox(props: Props) {
    const datapunkter: Array<Array<InfoElement>> = fjernTommeRaderOgKolonner(mapAktivietTypeToInfobox(props.aktivitet));

    return (
        <>
            {datapunkter.map(rad => (
                <div className="aktivitet-kort__infobox__row">
                    {rad.map(element => (
                        <div className={'aktivitetkort__infobox__row__item'}>
                            <EtikettLiten children={element.label} className="label" />
                            {element.label === 'Lenke' ? (
                                <Lenke href={element.data} children={element.data} />
                            ) : (
                                <Undertekst children={element.data} className="data" />
                            )}
                            <div className={'aktivitet-kort__infobox__row__item'}>
                                <EtikettLiten children={element.label} className="label" />
                                {element.label === 'Lenke' ? (
                                    <Lenke href={element.data} children={element.data} />
                                ) : (
                                    <Undertekst children={element.data} className="data" />
                                )}
                            </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );

    interface InfoElement {
        label: string;
        data: string;
    }

    type GridConfig = Array<Array<InfoElement>>;

    function mapAktivietTypeToInfobox(aktivitet: Aktivitet): GridConfig {
        switch (aktivitet.type) {
            case 'STILLING':
                return [
                    [
                        { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                        {
                            label: 'Frist',
                            data: formaterDate(aktivitet.tilDato)
                        }
                    ],
                    [
                        { label: 'Arbeidsgiver', data: aktivitet.arbeidsgiver! },
                        {
                            label: 'Arbeidssted',
                            data: aktivitet.arbeidssted!
                        }
                    ],
                    [{ label: 'Beskrivelse', data: aktivitet.beskrivelse ? aktivitet.beskrivelse : '' }],
                    [{ label: 'Lenke', data: aktivitet.lenke ? aktivitet.lenke : '' }]
                ];

            case 'MOTE':
                return [
                    [{ label: 'Dato', data: formaterDate(aktivitet.fraDato) }, { label: 'Klokkeslett', data: '' }],
                    [
                        { label: 'Møteform', data: mapKanalToString(aktivitet.kanal!) },
                        {
                            label: 'Varighet',
                            data: ''
                        }
                    ],
                    [{ label: 'Møtested', data: aktivitet.adresse ? aktivitet.adresse : '' }],
                    [{ label: 'Hensikt med møtet', data: aktivitet.hensikt ? aktivitet.hensikt : '' }]
                ];
            case 'SOKEAVTALE':
                return [
                    [
                        { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
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
                        { label: 'Oppfølging fra nav', data: aktivitet.oppfolging! }
                    ],
                    [{ label: 'Beskrivelse', data: aktivitet.beskrivelse! }]
                ];
            case 'BEHANDLING':
                return [
                    [
                        { label: 'Type behandling', data: aktivitet.behandlingType! },
                        { label: 'Behandlingssted', data: aktivitet.behandlingSted! }
                    ],
                    [
                        { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                        {
                            label: 'Til dato',
                            data: formaterDate(aktivitet.tilDato)
                        }
                    ],
                    [
                        { label: 'Mål for behandlingen', data: aktivitet.effekt! },
                        { label: 'Oppfølging fra NAV', data: aktivitet.oppfolging! }
                    ],
                    [{ label: 'Beskrivelse', data: aktivitet.beskrivelse! }]
                ];
            case 'SAMTALEREFERAT':
                return [
                    [
                        { label: 'Dato', data: formaterDate(aktivitet.tilDato) },
                        { label: 'Møteform', data: mapKanalToString(aktivitet.kanal!) }
                    ],
                    [{ label: 'Samtalereferat', data: aktivitet.referat! }]
                ];

            case 'EGEN':
                return [
                    [
                        { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                        {
                            label: 'Til dato',
                            data: formaterDate(aktivitet.tilDato)
                        }
                    ],
                    [{ label: 'Mål med aktiviteten', data: aktivitet.hensikt! }],
                    [{ label: 'Min huskeliste', data: aktivitet.oppfolging! }],
                    [{ label: 'Beskrivelse', data: aktivitet.beskrivelse! }],
                    [{ label: 'Lenke', data: aktivitet.lenke! }]
                ];
            case 'IJOBB':
                return [
                    [
                        { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                        {
                            label: 'Til dato',
                            data: formaterDate(aktivitet.tilDato)
                        }
                    ],
                    [
                        { label: 'Stillingsandel', data: aktivitet.jobbStatus! },
                        { label: 'Arbeidsgiver', data: aktivitet.arbeidsgiver! }
                    ],
                    [{ label: 'Beskrivelse', data: aktivitet.beskrivelse! }]
                ];
            case 'TILTAKSAKTIVITET':
                return [
                    [
                        { label: 'Fra dato', data: formaterDate(aktivitet.fraDato) },
                        {
                            label: 'Til dato',
                            data: formaterDate(aktivitet.tilDato)
                        }
                    ],
                    [
                        { label: 'Arrangør', data: aktivitet.arrangoer! },
                        { label: 'Deltakelse', data: aktivitet.deltakelseProsent!.toString() }
                    ],
                    [{ label: 'Antall dager per uke', data: aktivitet.antallDagerPerUke!.toString() }],
                    [{ label: 'Beskrivelse', data: aktivitet.beskrivelse! }]
                ];
        }

        return [];
    }

    function fjernTommeRaderOgKolonner(config: GridConfig): GridConfig {
        config = config.filter(row => row.filter(element => element.data).length !== 0);

        return config;
    }

    function mapKanalToString(kanal: string) {
        switch (kanal) {
            case 'OPPMOTE':
                return 'Oppmøte';
            case 'TELEFON':
                return 'Telefonmøte';
            case 'INTERNETT':
                return 'Nettmøte';
        }
        return '';
    }
}
