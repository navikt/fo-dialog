import { Tag } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import { StillingFraNavSoknadsstatus } from '../../../utils/aktivitetTypes';
import EtikettBase from './etikett-base';
import styles from './sokestatusEtikett.module.less';

const getCls = (etikettnavn: StillingFraNavSoknadsstatus): string => {
    switch (etikettnavn) {
        case StillingFraNavSoknadsstatus.VENTER:
            return styles.navGronnLighten60;
        case StillingFraNavSoknadsstatus.SKAL_PAA_INTERVJU:
            return styles.navLysBlaLighten60;
        case StillingFraNavSoknadsstatus.JOBBTILBUD:
            return styles.navOransjeLighten60;
        case StillingFraNavSoknadsstatus.AVSLAG:
            return styles.navGra20;
    }
};

const getText = (etikettnavn: StillingFraNavSoknadsstatus): string => {
    switch (etikettnavn) {
        case StillingFraNavSoknadsstatus.VENTER:
            return 'Venter på å bli kontaktet';
        case StillingFraNavSoknadsstatus.SKAL_PAA_INTERVJU:
            return 'Skal på intervju';
        case StillingFraNavSoknadsstatus.JOBBTILBUD:
            return 'Fått jobbtilbud 🎉';
        case StillingFraNavSoknadsstatus.AVSLAG:
            return 'Fått avslag';
    }
};

export interface Props {
    etikett?: StillingFraNavSoknadsstatus;
    className?: string;
    hidden?: boolean;
}

function StillingFraNavEtikett(props: Props) {
    const { etikett, className, hidden } = props;

    if (!etikett) return null;

    const cls = getCls(etikett);

    if (hidden) return null;
    return <Tag variant="alt1">{getText(etikett)}</Tag>;
}

export default StillingFraNavEtikett;
