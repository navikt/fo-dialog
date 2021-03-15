import { Formstate } from '@nutgaard/use-formstate';
import React from 'react';

import Input from '../../felleskomponenter/input/Input';
import { NyDialogInputProps } from './NyDialogForm';
import style from './NyDialogForm.module.less';

interface Props {
    state: Formstate<NyDialogInputProps>;
    onChange: (tema?: string, melding?: string) => void;
    aktivitetId?: string;
}

export const TemaInput = (props: Props) => {
    const { state, onChange, aktivitetId } = props;

    return (
        <Input
            autoFocus
            className={style.temafelt}
            label="Tema"
            autoComplete="off"
            placeholder="Skriv hva meldingen handler om"
            disabled={!!aktivitetId}
            maxLength={!!aktivitetId ? undefined : 100}
            submittoken={state.submittoken}
            onChange={(e) => onChange(e.target.value, undefined)}
            {...state.fields.tema}
        />
    );
};
