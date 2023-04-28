import { Button } from '@navikt/ds-react';
import React from 'react';

import { fetchData } from '../../utils/Fetch';
import { UpdateTypes, dispatchUpdate } from '../../utils/UpdateEvent';
import { apiBasePath } from '../../utils/UseApiBasePath';
import { useOppfolgingContext } from '../OppfolgingProvider';
import StatusAdvarselWrapper, { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

function ManuellBruker(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <Bruker />;
}

function Bruker() {
    const oppfolgingData = useOppfolgingContext();

    const fjernManuell = () => {
        fetchData(`${apiBasePath}/veilarboppfolging/api/oppfolging/settDigital`, {
            method: 'POST'
        })
            .then(oppfolgingData.hentOppfolging)
            .then(() => dispatchUpdate(UpdateTypes.Oppfolging));
    };

    return (
        <div className="flex flex-col">
            <StatusAdvarselWrapper>
                Du har ikke digital oppfølging fra NAV. Du kan derfor ikke ha digital dialog med veileder
            </StatusAdvarselWrapper>
            <Button onClick={fjernManuell} className="mt-4 self-center">
                {' '}
                Endre til digital oppfølging{' '}
            </Button>
        </div>
    );
}

export default ManuellBruker;
