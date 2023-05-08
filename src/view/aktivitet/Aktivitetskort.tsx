import { Heading } from '@navikt/ds-react';
import React from 'react';

import { Aktivitet, ArenaAktivitet } from '../../utils/aktivitetTypes';
import { getAktivitetType } from '../utils/utils';
import AktivitetIngress from './AktivitetIngress';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import AktivitetskortLenke from './AktivitetskortLenke';
import Brodsmulesti from './Brodsmulesti';
import AvtaltMarkering from './etiketter/avtalt-markering';

export function Aktivitetskort({ aktivitet }: { aktivitet: Aktivitet | ArenaAktivitet }) {
    const { status, tittel, avtalt, id } = aktivitet;
    return (
        <section aria-label="Aktivitet knyttet til dialog" className="m-4">
            <AktivitetskortLenke aktivitetId={id} />
            <Brodsmulesti status={status} type={getAktivitetType(aktivitet)} />
            <Heading size="large" level="2">
                {tittel}
            </Heading>
            <AktivitetIngress aktivitetType={getAktivitetType(aktivitet)} />
            <AktivitetskortInfoBox aktivitet={aktivitet} />
            <AvtaltMarkering hidden={!avtalt} />
        </section>
    );
}
