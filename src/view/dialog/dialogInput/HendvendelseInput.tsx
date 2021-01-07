import { Formstate } from '@nutgaard/use-formstate';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';

import EkspanderbartTekstArea from '../../../felleskomponenter/textArea/TextArea';
import styles from './HendvendelseInput.module.less';

interface HenvendelseInputProps {
    autoFocus?: boolean;
    state: Formstate<{ [p: string]: any }>;
    laster: boolean;
    kanSendeHenvendelse: boolean;
    maxMeldingsLengde: number;
    onChange?: React.ChangeEventHandler;
}

const HenvendelseInput = (props: HenvendelseInputProps) => {
    const { autoFocus, state, laster, onChange, kanSendeHenvendelse, maxMeldingsLengde } = props;

    if (!kanSendeHenvendelse) {
        return null;
    }

    return (
        <div className={styles.skrivMelding}>
            <EkspanderbartTekstArea
                placeholder="Skriv om arbeid og oppfølging"
                maxLength={maxMeldingsLengde}
                visTellerFra={1000}
                autoFocus={autoFocus}
                submittoken={state.submittoken}
                onChange={onChange}
                {...state.fields.melding}
            />
            <Hovedknapp
                className={styles.sendKnapp}
                title="Send"
                autoDisableVedSpinner
                spinner={laster}
                htmlType="submit"
            >
                Send
            </Hovedknapp>
        </div>
    );
};

export default HenvendelseInput;
