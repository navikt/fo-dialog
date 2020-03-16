import React, { useLayoutEffect } from 'react';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import styles from './InfoOmDialogSide.module.less';
import dialogStyle from '../dialog/Dialog.module.less';
import { DialogHeader } from '../dialog/DialogHeader';
import classNames from 'classnames';
import { useSkjulHodefotForMobilVisning } from '../utils/useSkjulHodefotForMobilVisning';
import Lenke from 'nav-frontend-lenker';
import useApiBasePath from '../../utils/UseApiBasePath';

const cls = classNames(dialogStyle.overflowAuto, dialogStyle.dialog);

export function InfoOmDialogSide() {
    useSkjulHodefotForMobilVisning();
    useLayoutEffect(() => {
        document.getElementById('om-dialog')?.focus();
    });
    const apiBasePath = useApiBasePath();

    return (
        <section aria-label="Om dialog" id="om-dialog" className={cls} tabIndex={-1}>
            <DialogHeader />

            <div className={styles.side}>
                <div className={styles.seksjon}>
                    <Innholdstittel>Om dialog</Innholdstittel>
                    <Normaltekst>
                        I dialogen kan du og veilederen din skrive til hverandre om arbeid og oppfølging. Dere kan blant
                        annet sende meldinger om aktivitetene dine i{' '}
                        <Lenke href={`${apiBasePath}/aktivitetsplan`}>aktivitetsplanen</Lenke>.
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
                    <Element>Dialogen skal ikke handle om økonomi</Element>
                    <Normaltekst>
                        Du skal bare skrive om det som handler om å komme i jobb eller aktivitet. Du kan ikke stille
                        spørsmål her om økonomi eller boligsituasjonen din.
                    </Normaltekst>

                    <Normaltekst>Har du spørsmål om økonomi, kan du</Normaltekst>
                    <ul>
                        <Normaltekst tag="li">
                            kontakte NAV i tjenesten{' '}
                            <a className="lenke" href="https://www.nav.no/person/kontakt-oss/skriv-til-oss">
                                «Skriv til oss»
                            </a>
                        </Normaltekst>
                        <Normaltekst tag="li">ringe NAV på 55 55 33 33</Normaltekst>
                        <Normaltekst tag="li">
                            lese om{' '}
                            <a
                                className="lenke"
                                href="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering"
                            >
                                dagpenger
                            </a>
                            ,{' '}
                            <a className="lenke" href="https://www.nav.no/no/Person/Arbeid/Arbeidsavklaringspenger">
                                arbeidsavklaringspenger
                            </a>
                            ,{' '}
                            <a className="lenke" href="https://www.nav.no/sosialhjelp">
                                økonomisk sosialhjelp
                            </a>{' '}
                            på nav.no
                        </Normaltekst>
                        <Normaltekst tag="li">
                            <a className="lenke" href="https://www.nav.no/person/kontakt-oss/chat">
                                chatte med oss
                            </a>
                            . Chatten er ikke innlogget, du kan bare stille generelle spørsmål.
                        </Normaltekst>
                    </ul>
                </div>

                <Ekspanderbartpanel tittel="Rettigheter og personvern" border>
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
