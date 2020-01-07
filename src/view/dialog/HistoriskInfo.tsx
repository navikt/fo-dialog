import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import styles from './HistoriskInfo.module.less';

interface Props {
    kanSendeMelding: boolean;
    hiden?: boolean;
}

function HistoriskInfo(props: Props) {
    if (props.hiden) {
        return null;
    }

    return (
        <div className={styles.historiskInfo}>
            <Normaltekst className={styles.historiskTekst}>
                Dette er en dialog fra en tidligere oppfølgingsperiode, og du kan derfor ikke svare på den.
            </Normaltekst>
            <Link className="knapp knapp--hoved" to={'/ny'} hidden={!props.kanSendeMelding}>
                Ny dialog
            </Link>
        </div>
    );
}

export default HistoriskInfo;
