import React from 'react';
import OkMessage from '../../felleskomponenter/mesage/OkMessage';
import { HandlingsType, ViewState } from '../ViewState';
import { DialogData, StringOrNull } from '../../utils/Typer';
import { Normaltekst } from 'nav-frontend-typografi';
import Hjelpetekst from '../../felleskomponenter/Hjelpetekst';
import styles from './DialogSendtBekreftelse.module.less';

function getTekst(handling: HandlingsType, erVeileder: boolean, overskrift: StringOrNull) {
    if (erVeileder && HandlingsType.ingen !== handling) {
        return 'Sendt. Bruker får beskjed på sms eller e-post om en halvtime';
    } else if (HandlingsType.nyHenvendelse === handling) {
        return 'Sendt. Du kan forvente svar i løpet av noen dager';
    } else if (HandlingsType.nyDialog === handling) {
        if (!overskrift) {
            return 'Sendt. Du kan forvente svar i løpet av noen dager';
        }
        return `Meldingen om "${overskrift}" er sendt. Du kan forvente svar i løpet av noen dager`;
    }
    return null;
}

interface Props {
    viewState: ViewState;
    dialog: DialogData;
    fnr?: string;
}

export function DialogSendtBekreftelse(props: Props) {
    const { viewState, dialog, fnr } = props;
    const erVeileder = !!fnr;

    const tekst = getTekst(viewState.sistHandlingsType, erVeileder, dialog.overskrift);

    if (!tekst) {
        return null;
    }

    return (
        <div>
            <OkMessage>
                <Normaltekst>{tekst}</Normaltekst>
                <Hjelpetekst className={styles.hjelpeTekst} hidden={!erVeileder}>
                    <div className={styles.hjelpeTekstInnhold}>
                        <Normaltekst>
                            Hvis ikke brukeren leser dialogmeldingen innen en halvtime, så vil brukeren motta meldingen
                            på den måten de har registrert i det offentlige kontaktregisteret. Brukeren får beskjed om
                            en ny melding og det lenkes til dialogen. Beskjeden sendes gjennom Altinn.
                        </Normaltekst>
                        <Normaltekst>
                            Sender du flere meldinger innen en halv time så blir det kun sendt én SMS eller e-post.
                        </Normaltekst>
                    </div>
                </Hjelpetekst>
            </OkMessage>
        </div>
    );
}

export default DialogSendtBekreftelse;
