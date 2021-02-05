import { Formstate } from '@nutgaard/use-formstate';
import React from 'react';

import EkspanderbartTekstArea from '../../felleskomponenter/textArea/TextArea';
import { NyDialogInputProps } from './NyDialogForm';
import style from './NyDialogForm.module.less';

interface Props {
    maxMeldingsLengde: number;
    state: Formstate<NyDialogInputProps>;
    onChange: (tema?: string, melding?: string) => void;
}

export const SkrivMeldingInput = (props: Props) => {
    const { maxMeldingsLengde, state, onChange } = props;

    return (
        <div className={style.skrivMelding}>
            <EkspanderbartTekstArea
                label="Melding"
                placeholder="Skriv om arbeid og oppfølging"
                maxLength={maxMeldingsLengde}
                visTellerFra={1000}
                minRows={2}
                submittoken={state.submittoken}
                onChange={(e) => onChange(undefined, e.target.value)}
                {...state.fields.melding}
            />
        </div>
    );
};
