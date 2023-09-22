import { Heading } from '@navikt/ds-react';
import React from 'react';

import { useVisAktivitet } from '../AktivitetToggleContext';
import { useCompactMode } from '../FeatureToggleProvider';
import { useSelectedAktivitet } from '../utils/useAktivitetId';
import { getAktivitetType } from '../utils/utils';
import AktivitetIngress from './AktivitetIngress';
import { AktivitetskortInfoBox } from './AktivitetskortInfoBox';
import Brodsmulesti from './Brodsmulesti';
import AvtaltMarkering from './etiketter/avtalt-markering';
import classNames from 'classnames';

export function Aktivitetskort() {
    const aktivitet = useSelectedAktivitet();
    const compactMode = useCompactMode();
    const visAktivitet = useVisAktivitet();
    if (!aktivitet) {
        if (compactMode) {
            return null;
        }
        return <div className="border-l border-border-divider xl:w-full xl:max-w-screen-w-1/3" />;
    }

    const { status, tittel, avtalt } = aktivitet;
    return (
        <div
            className={classNames(' w-full border-l border-border-divider lg:max-w-[320px] xl:max-w-screen-w-1/3', {
                hidden: !visAktivitet,
                ' lg:flex hidden': visAktivitet,
                '2xl:flex 2xl:max-w-screen-w-1/4': compactMode,
                'hidden lg:flex': !compactMode
            })}
        >
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
