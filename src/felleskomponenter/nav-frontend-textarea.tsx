import * as React from 'react';
import { guid, autobind } from 'nav-frontend-js-utils';
import 'nav-frontend-skjema-style';
import classNames from 'classnames';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import HenvendelseTextarea from '../view/henvendelse/HenvendelseTextarea'; // tslint:disable-line:max-line-length

const inputCls = (className: string, harFeil: SkjemaelementFeil | undefined) =>
    classNames(className, 'skjemaelement__input textarea--medMeta', { 'skjemaelement__input--harFeil': harFeil });

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * Ledetekst for tekstområdet
     */
    label: React.ReactNode;
    /**
     * Maks antal tegn som kan skrives inn i tekstområdet
     */
    maxLength?: number;
    /**
     * Teksten som er skrevet inn i tekstområdet.
     */
    value: string;
    /**
     * Klassenavn for tekstomnrådet
     */
    textareaClass?: string;
    /**
     * Id for tekstområdet, settes til name eller random guid hvis prop ikke er satt
     */
    id?: string;
    /**
     * Navn for tekstområdet, settes til id eller random guid hvis prop ikke er satt
     */
    name?: string;
    /**
     * Optional onChange handler
     */
    onChange: (event: React.SyntheticEvent<EventTarget>) => void;
    /**
     * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
     */
    feil?: SkjemaelementFeil;
    tellerTekst?: (antallTegn: number, maxLength: number) => React.ReactNode;
    textareaRef?: (element: HTMLTextAreaElement | null) => void;
}

interface TextareaDefaultProps {
    maxLength: number;
    textareaClass: string;
    tellerTekst: (antallTegn: number, maxLength: number) => React.ReactNode;
}

type PropsWithDefault = TextareaProps & TextareaDefaultProps;

/**
 * Selvekspanderende tekstområde med teller
 */
class Textarea extends React.Component<TextareaProps> {
    private tekstomrade: HTMLTextAreaElement | null = null;

    static defaultProps = {
        maxLength: 2000,
        textareaClass: '',
        id: undefined,
        name: undefined,
        feil: undefined,
        tellerTekst: defaultTellerTekst,
        textareaRef: undefined
    };

    constructor(props: TextareaProps) {
        super(props);
        autobind(this);
    }

    render() {
        const { label, maxLength, textareaClass, id, name, feil, tellerTekst, textareaRef, onChange, ...other } = this
            .props as PropsWithDefault;
        const textareaId = id || name || guid();
        const antallTegn = other.value.length;

        return (
            <div className="skjemaelement textarea__container">
                <label className="skjemaelement__label" htmlFor={textareaId}>
                    {label}
                </label>
                <div className="textarea--medMeta__wrapper">
                    <HenvendelseTextarea
                        ref={textarea => {
                            this.tekstomrade = textarea;
                            if (textareaRef !== undefined) textareaRef(textarea);
                        }}
                        onChange={onChange}
                        className={inputCls(textareaClass, feil)}
                        id={textareaId}
                        name={name}
                        {...other}
                    />
                    {!!maxLength && <Teller antallTegn={antallTegn} maxLength={maxLength} tellerTekst={tellerTekst} />}
                </div>
                <SkjemaelementFeilmelding feil={feil} />
            </div>
        );
    }
}

interface TellerProps {
    antallTegn: number;
    maxLength: number;
    tellerTekst: (antallTegn: number, maxLength: number) => React.ReactNode;
}

const Teller = (props: TellerProps) => {
    return <p className="textarea--medMeta__teller">{props.tellerTekst(props.antallTegn, props.maxLength)}</p>;
};

function defaultTellerTekst(antallTegn: number, maxLength: number) {
    const difference = antallTegn - maxLength;
    const remainingLetters = maxLength - antallTegn;
    const ariaAttrs: any = {};
    if (antallTegn > maxLength) {
        ariaAttrs['aria-live'] = 'assertive';
        return <span {...ariaAttrs}>Du har {difference} tegn for mye</span>;
    }
    if (remainingLetters === 5 || remainingLetters === 10 || remainingLetters === 0) {
        ariaAttrs['aria-live'] = 'polite';
    }
    return <span {...ariaAttrs}>Du har {remainingLetters} tegn igjen</span>;
}

export default Textarea;
