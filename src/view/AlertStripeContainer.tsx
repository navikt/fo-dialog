import React, {useContext} from "react";
import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {visibleIfHoc} from "../component/hoc/visibleIfHoc";
import {OppfolgingContext, UserInfoContext} from "../Context";
import {Normaltekst} from "nav-frontend-typografi";

import "./alertstripe-container.less"

const OppfolgingAlertStripeVisibleProp  = visibleIfHoc(AlertStripeAdvarsel);


export function AlertStripeContainer(){
    const oppfolgingData = useContext(OppfolgingContext);
    const UserInfo = useContext(UserInfoContext);

    const erVeileder = UserInfo!.erVeileder;
    const isUnderOppfolging= oppfolgingData!.underOppfolging;
    const hasOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;
    return (
        <div>
            <div className="oppfolging-alertstripe">
                <OppfolgingAlertStripeVisibleProp visible={(!erVeileder && !isUnderOppfolging && !hasOppfolgingsPerioder)}>
                    Du må være registrert hos NAV for å bruke aktivitetsplanen.
                </OppfolgingAlertStripeVisibleProp>
            </div>
            <div className="oppfolging-alertstripe">
                <OppfolgingAlertStripeVisibleProp visible={!erVeileder && !isUnderOppfolging}>
                    <Normaltekst>
                        Du er ikke lenger registrert hos NAV og din tidligere aktivitetsplan er lagt under "Mine tidligere planer". Hvis du fortsatt skal motta ytelser, få oppfølging fra NAV og bruke aktivitetsplanen må du være registrert.
                    </Normaltekst>
                     <a href="https://www.nav.no/Forsiden">www.nav.no</a>
                </OppfolgingAlertStripeVisibleProp>
            </div>
            <div className="oppfolging-alertstripe">
                <OppfolgingAlertStripeVisibleProp visible={erVeileder && !isUnderOppfolging && !hasOppfolgingsPerioder}>
                    Denne brukeren er ikke registrert.
                </OppfolgingAlertStripeVisibleProp>
            </div>

        </div>
    )


}
