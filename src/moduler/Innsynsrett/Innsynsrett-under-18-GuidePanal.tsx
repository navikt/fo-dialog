import { GuidePanel } from '@navikt/ds-react';
//import { useSelector } from 'react-redux';
//import { selectInnsynsrett } from './innsynsrett-selector';

export const InnsynsrettInfo = () => {
    //const innsynsrett = useSelector(selectInnsynsrett);

    //if (!innsynsrett || !innsynsrett.foresatteHarInnsynsrett) return null;

    return <GuidePanel
                poster={true}>Her kan du skrive til din veileder om arbeid og oppfølging.
                Du vil få svar i løpet av noen dager. Husk at dine foresatte kan be om å få lese det du skriver her.
           </GuidePanel>;
};
