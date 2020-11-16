import classNames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React from 'react';

import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import styles from './InfoVedIngenDialoger.module.less';
import { ReactComponent as VeilederIkon } from './veileder.svg';

interface PropTypes {
    className: string;
}

function InfoVedIngenDialoger(props: PropTypes) {
    return (
        <div className={classNames(props.className, styles.ingenDialoger)}>
            <Veilederpanel type={'plakat'} kompakt fargetema="suksess" svg={<VeilederIkon />}>
                <Normaltekst className={styles.avsnitt}>
                    Her kan du sende meldinger til veilederen din om arbeid og oppfølging.
                </Normaltekst>
                <Normaltekst className={styles.avsnitt}>Du får svar i løpet av noen dager.</Normaltekst>
            </Veilederpanel>
        </div>
    );
}

export default visibleIfHoc(InfoVedIngenDialoger);
