import { Link, Heading } from '@navikt/ds-react';
import React from 'react';

import StatusAdvarselWrapper, { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';
import { erKRRBruker } from '../../mock/demo/localstorage';

interface Props {
    erVeileder: boolean;
}

export default function ReservertKrr(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <BrukerKrr />;
}

function BrukerKrr() {
   if (!erKRRBruker()) {
       return (
           <StatusAdvarselWrapper>
               <Heading spacing size="small" level="3">
                   Vi har ikke din kontaktinformasjon
               </Heading>
               Du kan ikke sende meldinger i dialogen fordi du ikke har registrert
               e-post eller telefonnummeret ditt i kontakt og reservasjonsregisteret (KRR).
               <Link href="https://www.norge.no/nb/digital-borger/reservasjon">
                   Gå til norge.no for å registrere.
               </Link>
           </StatusAdvarselWrapper>
       )
   }
else {
       return (
           <StatusAdvarselWrapper>
               <Heading spacing size="small" level="3">
                   Du har reservert deg mot digital kommunikasjon
               </Heading>
               Du kan ikke sende meldinger i den digitale dialogen fordi
               du har reservert deg mot digital kommunikasjon i kontakt og reservasjonsregisteret (KRR).
               <Link href="https://www.norge.no/nb/digital-borger/reservasjon">
                   Gå til Norge.no for å fjerne reservasjonen
               </Link>
           </StatusAdvarselWrapper>
       );
   }
}
