import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { fetchData } from '../../utils/Fetch';
import { useOppfolgingContext } from '../Provider';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';
import useApiBasePath from '../../utils/UseApiBasePath';
import StatusAdvarselWrapper, { KanIkkeKonteteElektroniskVeileder } from './StatusAdvarselWrapper';
import styles from './AlertLess.module.less';

interface Props {
    erVeileder: boolean;
}

function MannuelBruker(props: Props) {
    return props.erVeileder ? <KanIkkeKonteteElektroniskVeileder /> : <Bruker />;
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
