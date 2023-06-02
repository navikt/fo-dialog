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
    if (!aktivitet) return <div className="border-l border-border-divider xl:w-full xl:max-w-screen-w-1/3" />;
    const { status, tittel, avtalt } = aktivitet;
    return (
        <div className="hidden w-full border-l border-border-divider lg:flex lg:max-w-[320px] xl:max-w-screen-w-1/3">
            <section
                aria-label="Aktivitet knyttet til dialog"
                className="m-4 mr-0 w-full overflow-y-auto overflow-x-visible xl:max-w-max-paragraph"
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
