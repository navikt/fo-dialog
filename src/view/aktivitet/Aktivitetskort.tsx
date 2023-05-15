import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
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
    const { status, tittel, avtalt, id } = aktivitet;
    return (
        <div
            className={classNames(
                'hidden lg:flex',
                'w-full max-w-[30rem] border-l  border-border-divider overflow-y-hidden xl:max-w-screen-w-1/3'
            )}
        >
            <section aria-label="Aktivitet knyttet til dialog" className="m-4 xl:max-w-max-paragraph">
                <Brodsmulesti status={status} type={getAktivitetType(aktivitet)} />
                <Heading size="large" level="2">
                    {tittel}
                </Heading>
                <AktivitetIngress aktivitetType={getAktivitetType(aktivitet)} />
                <AktivitetskortInfoBox aktivitet={aktivitet} />
                <AvtaltMarkering hidden={!avtalt} />
            </section>
        </div>
    );
}
