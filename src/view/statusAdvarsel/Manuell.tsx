import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';

import { fetchData } from '../../utils/Fetch';
import { UpdateTypes, dispatchUpdate } from '../../utils/UpdateEvent';
import useApiBasePath from '../../utils/UseApiBasePath';
import { useOppfolgingContext } from '../Provider';
import styles from './AlertLess.module.less';
import StatusAdvarselWrapper, { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

function MannuelBruker(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <Bruker />;
}

function Bruker() {
    const oppfolgingData = useOppfolgingContext();
    const apiBasePath = useApiBasePath();

    const fjernManuell = () => {
        fetchData(`${apiBasePath}/veilarboppfolging/api/oppfolging/settDigital`, {
            method: 'POST'
        })
            .then(oppfolgingData.rerun)
            .then(() => dispatchUpdate(UpdateTypes.Oppfolging));
    };

    return (
        <div className={styles.flexColum}>
            <StatusAdvarselWrapper>
                Du har ikke digital oppfølging fra NAV. Du kan derfor ikke ha digital dialog med veileder
            </StatusAdvarselWrapper>
            <Hovedknapp onClick={fjernManuell} className={styles.knapp}>
                {' '}
                Endre til digital oppfølging{' '}
            </Hovedknapp>
        </div>
    );
}

export default MannuelBruker;
