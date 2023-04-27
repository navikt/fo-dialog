import { BodyShort, GuidePanel } from '@navikt/ds-react';
import classNames from 'classnames';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import styles from './InfoVedIngenDialoger.module.less';
import { ReactComponent as VeilederIkon } from './veileder.svg';

interface PropTypes {
    className: string;
}

function InfoVedIngenDialoger(props: PropTypes) {
    return (
        <div className={classNames(props.className)}>
            <GuidePanel
            // svg={<VeilederIkon />}
            >
                <BodyShort className={styles.avsnitt}>
                    Her kan du sende meldinger til veilederen din om arbeid og oppfølging.
                </BodyShort>
                <BodyShort className={styles.avsnitt}>Du får svar i løpet av noen dager.</BodyShort>
            </GuidePanel>
        </div>
    );
}

export default visibleIfHoc(InfoVedIngenDialoger);
