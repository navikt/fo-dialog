import { Accordion, BodyLong, BodyShort, Heading, Link } from '@navikt/ds-react';
import classNames from 'classnames';
import React, { useLayoutEffect } from 'react';

import dialogStyle from '../dialog/Dialog.module.less';
import { InnsynsrettAccordionItem } from '../../moduler/om-dialogen/InnsynsrettAccordionItem';
import { RettigheterAccordionItem } from '../../moduler/om-dialogen/RettigheterAccordionItem';

export function InfoOmDialogSide() {
    useLayoutEffect(() => {
        document.getElementById('om-dialog')?.focus();
    });

    return (
        <section
            aria-label="Om dialog"
            id="om-dialog"
            className={classNames(dialogStyle.overflowAuto, dialogStyle.dialog, 'w-full max-w-2xl p-8 pt-0')}
            tabIndex={-1}
        >
            <div>
                <div className={'mb-8'}>
                    <BodyLong>
                        I dialogen kan du og veilederen din skrive til hverandre om arbeid og oppfølging. Dere kan blant
                        annet sende meldinger om aktivitetene dine i aktivitetsplanen.
                    </BodyLong>
                </div>

                <div className={'mb-8'}>
                    <Heading size="medium" level="2">
                        Hvor raskt får du svar?
                    </Heading>
                    <BodyLong>
                        Vi svarer deg i løpet av noen dager. Haster det, eller du ikke får svar, kontakt oss på telefon
                        55 55 33 33.
                    </BodyLong>
                </div>

                <div className={'mb-8'}>
                    <Heading size="medium" level="2">
                        Hvem skriver jeg til?{' '}
                    </Heading>
                    <BodyLong>
                        Du skriver til veilederen din på ditt NAV-kontor. Du kan også få svar fra andre kollegaer på
                        NAV-kontoret hvis veilederen din er syk eller på ferie.
                    </BodyLong>
                </div>

                <div className={'mb-8'}>
                    <Heading size="medium" level="2">
                        Dialogen skal handle om arbeid og veiledning
                    </Heading>
                    <BodyLong>
                        Meldingene i dialogen skal bare handle om det som er relevant for å komme i jobb eller
                        aktivitet. Har du spørsmål om økonomisk støtte, økonomisk sosialhjelp, boligsituasjon eller
                        annet, kan du
                    </BodyLong>
                    <ul className="mt-4 list-disc pl-8">
                        <li>
                            <BodyShort>
                                kontakte NAV i tjenesten{' '}
                                <Link href="https://www.nav.no/person/kontakt-oss/skriv-til-oss">«Skriv til oss»</Link>
                            </BodyShort>
                        </li>
                        <li>
                            <BodyShort>ringe NAV på 55 55 33 33</BodyShort>
                        </li>
                        <li>
                            <BodyShort>
                                lese om <Link href="https://www.nav.no/arbeid/arbeidsledig-permittert">dagpenger</Link>,{' '}
                                <Link href="https://www.nav.no/aap">arbeidsavklaringspenger</Link>,{' '}
                                <Link href="https://www.nav.no/okonomisk-sosialhjelp">økonomisk sosialhjelp</Link> på
                                nav.no
                            </BodyShort>
                        </li>
                        <li>
                            <BodyShort>
                                <Link href="https://www.nav.no/kontaktoss">chatte med oss</Link>. Chatten er ikke
                                innlogget, du kan bare stille generelle spørsmål.
                            </BodyShort>
                        </li>
                    </ul>
                </div>
                <Accordion>
                    <InnsynsrettAccordionItem />
                    <RettigheterAccordionItem />
                </Accordion>
            </div>
        </section>
    );
}
