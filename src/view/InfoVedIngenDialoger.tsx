import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import styles from './InfoVedIngenDialoger.module.less';
import { visibleIfHoc } from '../felleskomponenter/VisibleIfHoc';
import classNames from 'classnames';
import veilederIkon from './veileder.svg';

interface PropTypes {
    className: string;
}

function InfoVedIngenDialoger(props: PropTypes) {
    return (
        <div className={classNames(props.className, styles.ingenDialoger)}>
            <Veilederpanel type={'plakat'} kompakt fargetema="suksess" svg={<img src={veilederIkon} alt="" />}>
                Her kan du sende meldinger til veilederen din om arbeid og oppfølging. Klikk på "ny dialog" for å komme
                i gang.
                <br />
                <br />
                Du kan forvente svar i løpet av noen dager.
            </Veilederpanel>
        </div>
    );
}

export default visibleIfHoc(InfoVedIngenDialoger);
