import { Alert, BodyShort } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';

import Hjelpetekst from '../../felleskomponenter/Hjelpetekst';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { HandlingsType, ViewState } from '../ViewState';
import styles from './DialogSendtBekreftelse.module.less';

function getTekst(handling: HandlingsType, erVeileder: boolean, overskrift: StringOrNull) {
    if (erVeileder && HandlingsType.ingen !== handling) {
        return 'Sendt. Bruker får beskjed på sms eller e-post om en halvtime';
    } else if (HandlingsType.nyHenvendelse === handling) {
        return 'Sendt. Du får svar i løpet av noen dager.';
    } else if (HandlingsType.nyDialog === handling) {
        if (!overskrift) {
            return 'Sendt. Du får svar i løpet av noen dager.';
        }
        return `Meldingen om "${overskrift}" er sendt. Du får svar i løpet av noen dager.`;
    }
}

interface Props {
    viewState: ViewState;
    dialog: DialogData;
    fnr?: string;
}

function Melding(props: { tekst?: string; erVeileder: boolean }) {
    const [hasRendred, setHasRendred] = useState(false);
    useEffect(() => {
        setHasRendred(true);
    }, []);

    const { tekst, erVeileder } = props;

    return !tekst ? null : (
        <div className="flex justify-center" aria-hidden={!hasRendred}>
            <Alert variant="success" inline>
                <BodyShort>{tekst}</BodyShort>
            </Alert>
            {erVeileder && (
                <Hjelpetekst className="ml-1.5" hidden={!erVeileder}>
                    <div className={styles.hjelpeTekstInnhold}>
                        <BodyShort>
                            Hvis ikke brukeren leser dialogmeldingen innen en halvtime, så vil brukeren motta meldingen
                            på den måten de har registrert i det offentlige kontaktregisteret. Brukeren får beskjed om
                            en ny melding og det lenkes til dialogen. Beskjeden sendes gjennom Altinn i åpningstiden
                            9-17 på hverdager.
                        </BodyShort>
                        <BodyShort>
                            Sender du flere meldinger innen en halv time så blir det kun sendt én SMS eller e-post.
                        </BodyShort>
                    </div>
                </Hjelpetekst>
            )}
        </div>
    );
}

function DialogSendtBekreftelse(props: Props) {
    const { viewState, dialog, fnr } = props;
    const erVeileder = !!fnr;

    const tekst = getTekst(viewState.sistHandlingsType, erVeileder, dialog.overskrift);

    return (
        <div role="status" className="pb-4">
            <Melding erVeileder={erVeileder} tekst={tekst} />
        </div>
    );
}

export default DialogSendtBekreftelse;
