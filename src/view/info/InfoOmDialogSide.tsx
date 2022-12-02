import classNames from 'classnames';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { useLayoutEffect } from 'react';

import { getPathnamePrefix } from '../../utils/UseApiBasePath';
import dialogStyle from '../dialog/Dialog.module.less';
import { TittelHeader } from '../dialog/TittelHeader';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import styles from './InfoOmDialogSide.module.less';

const cls = classNames(dialogStyle.overflowAuto, dialogStyle.dialog);

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
                    <Normaltekst>
                        I dialogen kan du og veilederen din skrive til hverandre om arbeid og oppfølging. Dere kan blant
                        annet sende meldinger om aktivitetene dine i{' '}
                        <Lenke href={`${getPathnamePrefix(false)}/aktivitetsplan`}>aktivitetsplanen</Lenke>.
                    </Normaltekst>
                </div>

                <div className={styles.seksjon}>
                    <Element>Hvor raskt får du svar?</Element>
                    <Normaltekst>
                        Vi svarer deg i løpet av noen dager. Haster det, eller du ikke får svar, kontakt oss på telefon
                        55 55 33 33.
                    </Normaltekst>
                </div>

                <div className={styles.seksjon}>
                    <Element>Hvem skriver jeg til? </Element>
                    <Normaltekst>
                        Du skriver til veilederen din på ditt NAV-kontor. Du kan også få svar fra andre kollegaer på
                        NAV-kontoret hvis veilederen din er syk eller på ferie.
                    </Normaltekst>
                </div>

                <div className={styles.seksjon}>
                    <Element>Dialogen skal handle om arbeid og veiledning</Element>
                    <Normaltekst>
                        Meldingene i dialogen skal bare handle om det som er relevant for å komme i jobb eller
                        aktivitet. Har du spørsmål om økonomisk støtte, økonomisk sosialhjelp, boligsituasjon eller
                        annet, kan du
                    </Normaltekst>
                    <ul>
                        <Normaltekst tag="li">
                            kontakte NAV i tjenesten{' '}
                            <a className="lenke" href="https://www.nav.no/skriv-til-oss">
                                «Skriv til oss»
                            </a>
                        </Normaltekst>
                        <Normaltekst tag="li">ringe NAV på 55 55 33 33</Normaltekst>
                        <Normaltekst tag="li">
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
                        </Normaltekst>
                        <Normaltekst tag="li">
                            <a className="lenke" href="https://www.nav.no/kontaktoss">
                                chatte med oss
                            </a>
                            . Chatten er ikke innlogget, du kan bare stille generelle spørsmål.
                        </Normaltekst>
                    </ul>
                </div>

                <Ekspanderbartpanel tittel="Rettigheter og personvern" border>
                    <div className={styles.seksjon}>
                        <Normaltekst>
                            Informasjon du gir i meldinger til veilederen din brukes til å vurdere behovet ditt for
                            hjelp fra NAV.
                        </Normaltekst>
                    </div>
                    <div className={styles.seksjon}>
                        <Element>Manuell oppfølging</Element>
                        <Normaltekst>
                            NAV henter informasjon om deg fra Folkeregisteret og sjekker mot Kontakt- og
                            reservasjonsregisteret.
                        </Normaltekst>
                        <Normaltekst>
                            Hvis du ikke ønsker å bruke den digitale dialogen, så kan du reservere deg mot digital
                            kommunikasjon med det offentlige hos{' '}
                            <a className="lenke" href="https://www.norge.no/nn/reservasjon">
                                Norge.no
                            </a>{' '}
                            Hvis du reserverer deg mot digital kommunikasjon, vil NAV følge deg opp manuelt.
                        </Normaltekst>
                    </div>

                    <Element>Deling og lagring</Element>
                    <Normaltekst>
                        Opplysningene i dialogen og aktivitetsplanen blir ikke delt med andre offentlige etater, med
                        mindre de har rett til å hente slike opplysninger.
                    </Normaltekst>
                    <Normaltekst>
                        Opplysningene i dialogen og aktivitetsplanen blir lagret og oppbevart etter arkivloven.
                        Meldinger i dialogen kan ikke slettes når de først er opprettet.
                    </Normaltekst>
                    <Normaltekst>
                        Les mer om{' '}
                        <a
                            className="lenke"
                            href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten"
                        >
                            hvordan NAV behandler personopplysninger
                        </a>
                        .
                    </Normaltekst>
                </Ekspanderbartpanel>
            </div>
        </section>
    );
}
