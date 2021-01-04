import { FieldState } from '@nutgaard/use-formstate';
import classNames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import React, { ChangeEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Feilemelding from './Feilmelding';
import { Teller } from './Teller';
import styles from './TextArea.module.less';

interface Props {
    initialValue?: string;
    pristine?: boolean;
    autoFocus?: boolean;
    touched: boolean;
    error?: string;
    input: FieldState['input'];
    visTellerFra?: number;
    placeholder?: string;
    maxLength: number;
    label?: string;
    minRows?: number;
    submittoken?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const useGuid = (): string => {
    const useState1 = useState(guid());

    return useState1[0];
};

const EkspanderbartTekstArea = (props: Props) => {
    const {
        label,
        touched,
        error,
        input,
        pristine,
        initialValue,
        visTellerFra,
        onChange,
        submittoken,
        maxLength,
        minRows = 1,
        placeholder,
        ...rest
    } = props;

    const id = input.id ? input.id : guid();
    const feilmeldingId = useGuid();
    const feil = error && !!submittoken ? error : undefined;
    const labelTekst = 'Skriv en melding om arbeid og oppfølging';
    const inputProps = { ...input, ...rest };
    const length = input.value.length;

    const names = classNames(styles.textarea, { [styles.textareaFeil]: feil }, 'label-sr-only');

    const _onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e);
        input.onChange(e);
    };

    return (
        <div className={styles.wrapper}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <TextareaAutosize
                className={names}
                minRows={minRows}
                maxRows={10}
                placeholder={placeholder}
                aria-invalid={!!feil}
                aria-errormessage={feil ? feilmeldingId : undefined}
                aria-label={labelTekst}
                {...inputProps}
                onChange={_onChange}
                id={id}
            />
            <div className={styles.subContent}>
                <Feilemelding feilmelding={feil} id={feilmeldingId} />
                <Teller tegn={length} maksTegn={maxLength} visTellerFra={visTellerFra} />
            </div>
        </div>
    );
};

export default EkspanderbartTekstArea;
