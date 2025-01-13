import { Link, Heading } from '@navikt/ds-react';
import React from 'react';

import StatusAdvarselWrapper, { KanIkkeKontakteElektroniskVeileder } from './StatusAdvarselWrapper';

interface Props {
    erVeileder: boolean;
}

export default function ReservertKrr(props: Props) {
    return props.erVeileder ? <KanIkkeKontakteElektroniskVeileder /> : <BrukerKrr />;
}

function BrukerKrr() {
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
