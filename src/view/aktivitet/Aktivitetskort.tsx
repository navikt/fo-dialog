import { Heading } from '@navikt/ds-react';
import React from 'react';

import { useSelectedAktivitet } from '../utils/useAktivitetId';
import { getAktivitetType } from '../utils/utils';
import AktivitetIngress from './AktivitetIngress';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import Brodsmulesti from './Brodsmulesti';
import AvtaltMarkering from './etiketter/avtalt-markering';

export function Aktivitetskort() {
    const aktivitet = useSelectedAktivitet();
    if (!aktivitet) return <div className="border-l xl:max-w-screen-w-1/3 xl:w-full border-border-divider" />;
    const { status, tittel, avtalt } = aktivitet;
    return (
        <div className="hidden lg:flex lg:max-w-[320px] w-full xl:max-w-screen-w-1/3 border-l border-border-divider">
            <section
                aria-label="Aktivitet knyttet til dialog"
                className="m-4 mr-0 xl:max-w-max-paragraph w-full overflow-x-visible overflow-y-auto"
            >
                <Brodsmulesti status={status} type={getAktivitetType(aktivitet)} />
                <Heading size="large" level="1">
                    {tittel}
                </Heading>
                <AktivitetIngress aktivitetType={getAktivitetType(aktivitet)} />
                <AktivitetskortInfoBox aktivitet={aktivitet} />
                <AvtaltMarkering hidden={!avtalt} />
            </section>
        </div>
    );
}
