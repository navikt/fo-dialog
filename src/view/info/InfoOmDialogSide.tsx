import { BodyLong, BodyShort, ExpansionCard, Heading, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { useLayoutEffect } from 'react';

import { aktivtetsplanUrl } from '../../metrics/constants';
import dialogStyle from '../dialog/Dialog.module.less';
import { TittelHeader } from '../dialog/TittelHeader';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import styles from './InfoOmDialogSide.module.less';

const cls = classNames('border-x border-border-default', dialogStyle.overflowAuto, dialogStyle.dialog);

export function InfoOmDialogSide() {
    useSkjulHodefotForMobilVisning();
    useLayoutEffect(() => {
        document.getElementById('om-dialog')?.focus();
    });

    return (
        <section aria-label="Om dialog" id="om-dialog" className={cls} tabIndex={-1}>
            <TittelHeader>Om dialog</TittelHeader>

            <div className={styles.side}>
                <div className={styles.seksjon}>
                    <BodyLong>
                        I dialogen kan du og veilederen din skrive til hverandre om arbeid og oppfølging. Dere kan blant
                        annet sende meldinger om aktivitetene dine i{' '}
                        <Link href={`${aktivtetsplanUrl}`}>aktivitetsplanen</Link>.
                    </BodyLong>
                </div>

                <div className={styles.seksjon}>
                    <Heading level="2">Hvor raskt får du svar?</Heading>
                    <BodyLong>
                        Vi svarer deg i løpet av noen dager. Haster det, eller du ikke får svar, kontakt oss på telefon
                        55 55 33 33.
                    </BodyLong>
                </div>

                <div className={styles.seksjon}>
                    <Heading level="2">Hvem skriver jeg til? </Heading>
                    <BodyLong>
                        Du skriver til veilederen din på ditt NAV-kontor. Du kan også få svar fra andre kollegaer på
                        NAV-kontoret hvis veilederen din er syk eller på ferie.
                    </BodyLong>
                </div>

                <div className={styles.seksjon}>
                    <Heading level="2">Dialogen skal handle om arbeid og veiledning</Heading>
                    <BodyLong>
                        Meldingene i dialogen skal bare handle om det som er relevant for å komme i jobb eller
                        aktivitet. Har du spørsmål om økonomisk støtte, økonomisk sosialhjelp, boligsituasjon eller
                        annet, kan du
                    </BodyLong>
                    <ul>
                        <BodyShort as="li">
                            kontakte NAV i tjenesten{' '}
                            <a className="lenke" href="https://www.nav.no/skriv-til-oss">
                                «Skriv til oss»
                            </a>
                        </BodyShort>
                        <BodyShort as="li">ringe NAV på 55 55 33 33</BodyShort>
                        <BodyShort as="li">
                            lese om{' '}
                            <a className="lenke" href="https://www.nav.no/arbeid/arbeidsledig-permittert">
                                dagpenger
                            </a>
                            ,{' '}
                            <a className="lenke" href="https://www.nav.no/aap">
                                arbeidsavklaringspenger
                            </a>
                            ,{' '}
                            <a className="lenke" href="https://www.nav.no/okonomisk-sosialhjelp">
                                økonomisk sosialhjelp
                            </a>{' '}
                            på nav.no
                        </BodyShort>
                        <BodyShort as="li">
                            <a className="lenke" href="https://www.nav.no/kontaktoss">
                                chatte med oss
                            </a>
                            . Chatten er ikke innlogget, du kan bare stille generelle spørsmål.
                        </BodyShort>
                    </ul>
                </div>

                <ExpansionCard aria-label="Rettigheter og personvern">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title>Rettigheter og personvern</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <div className={styles.seksjon}>
                            <BodyShort>
                                Informasjon du gir i meldinger til veilederen din brukes til å vurdere behovet ditt for
                                hjelp fra NAV.
                            </BodyShort>
                        </div>
                        <div className={styles.seksjon}>
                            <Heading level="2">Manuell oppfølging</Heading>
                            <BodyShort>
                                NAV henter informasjon om deg fra Folkeregisteret og sjekker mot Kontakt- og
                                reservasjonsregisteret.
                            </BodyShort>
                            <BodyShort>
                                Hvis du ikke ønsker å bruke den digitale dialogen, så kan du reservere deg mot digital
                                kommunikasjon med det offentlige hos{' '}
                                <a className="lenke" href="https://www.norge.no/nn/reservasjon">
                                    Norge.no
                                </a>{' '}
                                Hvis du reserverer deg mot digital kommunikasjon, vil NAV følge deg opp manuelt.
                            </BodyShort>
                        </div>

                        <Heading level="2">Deling og lagring</Heading>
                        <BodyShort>
                            Opplysningene i dialogen og aktivitetsplanen blir ikke delt med andre offentlige etater, med
                            mindre de har rett til å hente slike opplysninger.
                        </BodyShort>
                        <BodyShort>
                            Opplysningene i dialogen og aktivitetsplanen blir lagret og oppbevart etter arkivloven.
                            Meldinger i dialogen kan ikke slettes når de først er opprettet.
                        </BodyShort>
                        <BodyShort>
                            Les mer om{' '}
                            <a
                                className="lenke"
                                href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten"
                            >
                                hvordan NAV behandler personopplysninger
                            </a>
                            .
                        </BodyShort>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </div>
        </section>
    );
}
