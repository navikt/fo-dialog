import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import styles from './InfoVedIngenDialoger.module.less';
import { visibleIfHoc } from '../felleskomponenter/VisibleIfHoc';
import classNames from 'classnames';
import { ReactComponent as VeilederIkon } from './veileder.svg';

interface PropTypes {
    className: string;
}

function InfoVedIngenDialoger(props: PropTypes) {
    return (
        <div className={classNames(props.className, styles.ingenDialoger)}>
            <Veilederpanel type={'plakat'} kompakt fargetema="suksess" svg={<VeilederIkon />}>
                <span className={styles.avsnitt}>
                    Her kan du sende meldinger til veilederen din om arbeid og oppfølging. Klikk på "ny dialog" for å
                    komme i gang.
                </span>
                <span className={styles.avsnitt}>Du kan forvente svar i løpet av noen dager.</span>
            </Veilederpanel>
        </div>
    );
}

export default visibleIfHoc(InfoVedIngenDialoger);
