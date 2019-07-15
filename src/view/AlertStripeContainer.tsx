import React from 'react';
import { AlertStripeAdvarsel, AlertStripeProps } from 'nav-frontend-alertstriper';
import { useOppfolgingContext, useUserInfoContext } from '../Context';
import { visibleIfHoc } from '../component/hoc/visibleIfHoc';

const AlertStripe = visibleIfHoc<AlertStripeProps>(AlertStripeAdvarsel);

export function AlertStripeContainer() {
    const oppfolgingData = useOppfolgingContext();
    const UserInfo = useUserInfoContext();

    const erVeileder = UserInfo!.erVeileder;
    const erUnderOppfolging = oppfolgingData!.underOppfolging;
    const harOppfolgingsPerioder = oppfolgingData!.oppfolgingsPerioder.length > 0;

    return (
        <>
            <AlertStripe
                data-ikke-reg-veileder-test
                visible={!erUnderOppfolging && !harOppfolgingsPerioder && erVeileder}
            >
                Denne brukeren er ikke registrert.
            </AlertStripe>

            <AlertStripe
                data-ikke-reg-bruker-test
                visible={!erUnderOppfolging && !harOppfolgingsPerioder && !erVeileder}
            >
                Du må være registrert hos NAV for å bruke aktivitetsplanen.
            </AlertStripe>

            <AlertStripe
                data-har-oppfP-bruker-test
                visible={!erUnderOppfolging && harOppfolgingsPerioder && !erVeileder}
            >
                Du er ikke lenger registrert hos NAV og din tidligere aktivitetsplan er lagt under "Mine tidligere
                planer". Hvis du fortsatt skal motta ytelser, få oppfølging fra NAV og bruke aktivitetsplanen må du være
                registrert.
                <a href="https://www.nav.no/Forsiden">www.nav.no</a>
            </AlertStripe>
        </>
    );
}
