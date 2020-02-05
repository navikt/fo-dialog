import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { fetchData } from '../../utils/Fetch';
import { useOppfolgingContext } from '../Provider';
import { dispatchUpdate, UpdateTypes } from '../../utils/UpdateEvent';

interface Props {
    erVeileder: boolean;
}

function MannuelBruker(props: Props) {
    return props.erVeileder ? <Veileder /> : <Bruker />;
}

function Veileder() {
    return <AlertStripeAdvarsel>Manuell bruker</AlertStripeAdvarsel>;
}

function Bruker() {
    const oppfolgingData = useOppfolgingContext();

    const fjernManuell = () => {
        fetchData('/veilarboppfolging/api/oppfolging/settDigital', {
            method: 'POST'
        })
            .then(oppfolgingData.rerun)
            .then(() => dispatchUpdate(UpdateTypes.Oppfolging));
    };

    return (
        <AlertStripeAdvarsel>
            Du får ikke digital oppfølging fra NAV og har derfor ikke tilgang til digital dialog med veileder. Klikk på
            knappen under hvis du ønsker å endre dette.
            <Hovedknapp onClick={fjernManuell}> Endre til digital oppfølging </Hovedknapp>
        </AlertStripeAdvarsel>
    );
}

export default MannuelBruker;
