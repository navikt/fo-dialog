import { Formstate } from '@nutgaard/use-formstate';
import React from 'react';

import Input from '../../felleskomponenter/input/Input';
import style from './NyDialogForm.module.less';

interface Props {
    state: Formstate<{ tema: any; melding: any }>;
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
            maxLength={!aktivitetId ? 101 : undefined}
            submittoken={state.submittoken}
            onChange={(e) => onChange(e.target.value, undefined)}
            {...state.fields.tema}
        />
    );
};
