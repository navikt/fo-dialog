import React, {useContext} from "react";
import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {OppfolgingContext, UserInfoContext} from "../Context";
import {Normaltekst} from "nav-frontend-typografi";

import "./alertstripe-container.less"

export function AlertStripeContainer(){
    const oppfolgingData = useContext(OppfolgingContext);
    const UserInfo = useContext(UserInfoContext);

    const erVeileder = UserInfo!.erVeileder;
    const erUnderOppfolging= oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;

    if (!erUnderOppfolging && !harOppfolgingsPerioder){
        if (erVeileder){
            return (<AlertStripeAdvarsel className="oppfolging-alertstripe">Denne brukeren er ikke registrert.</AlertStripeAdvarsel>)
        }
        else{
            return(<AlertStripeAdvarsel className="oppfolging-alertstripe">Du må være registrert hos NAV for å bruke aktivitetsplanen.</AlertStripeAdvarsel>)
        }
    }
    if (!erUnderOppfolging && harOppfolgingsPerioder && !erVeileder ){
    return (
            <AlertStripeAdvarsel>
                <Normaltekst>
                Du er ikke lenger registrert hos NAV og din tidligere aktivitetsplan er lagt under "Mine tidligere planer". Hvis du fortsatt skal motta ytelser, få oppfølging fra NAV og bruke aktivitetsplanen må du være registrert.
                </Normaltekst>
                <a href="https://www.nav.no/Forsiden">www.nav.no</a>
            </AlertStripeAdvarsel>
    );}
    return <></>
}
