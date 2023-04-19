import { Button } from '@navikt/ds-react';
import { Formstate } from '@nutgaard/use-formstate';
import React from 'react';

import EkspanderbartTekstArea from '../../../felleskomponenter/textArea/TextArea';
import styles from './HenvendelseInput.module.less';
import { HenvendelseInputBoxProps } from './HenvendelseInputBox';

interface HenvendelseInputProps {
    autoFocus?: boolean;
    state: Formstate<HenvendelseInputBoxProps>;
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
            <Button className={styles.sendKnapp} title="Send" loading={laster} type="submit">
                Send
            </Button>
        </div>
    );
};

export default HenvendelseInput;
