import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import styles from './InfoVedIngenDialoger.module.less';
import { visibleIfHoc } from '../../felleskomponenter/VisibleIfHoc';
import classNames from 'classnames';
import { ReactComponent as VeilederIkon } from './veileder.svg';
import { Normaltekst } from 'nav-frontend-typografi';

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
