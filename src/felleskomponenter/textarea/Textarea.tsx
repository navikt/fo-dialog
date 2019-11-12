import * as React from 'react';
import { autobind } from 'nav-frontend-js-utils';
import classNames from 'classnames';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import 'nav-frontend-skjema-style';
import './Textarea.less';

const inputCls = (className: string, harFeil: SkjemaelementFeil | undefined) =>
    classNames(className, 'skjemaelement__input textarea--medMeta', 'textarea-custom', {
        'skjemaelement__input--harFeil': harFeil
    });

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: React.ReactNode;
    maxLength: number;
    value: string;
    textareaClass: string;
    id: string;
    name: string;
    onChange: (event: React.SyntheticEvent<EventTarget>) => void;
    tellerTekst: (antallTegn: number, maxLength: number) => React.ReactNode;
    feil?: SkjemaelementFeil;
}

class Textarea extends React.Component<TextareaProps> {
    private tekstomrade: HTMLTextAreaElement | null = null;

    constructor(props: TextareaProps) {
        super(props);
        autobind(this);
    }

    onChange(event: React.SyntheticEvent<EventTarget>) {
        if (!!this.tekstomrade) {
            this.tekstomrade.style.height = 'inherit';
            this.tekstomrade.style.height = this.tekstomrade.scrollHeight + 'px';
        }

        this.props.onChange(event);
    }

    render() {
        const { label, maxLength, textareaClass, id, feil, tellerTekst, ...other } = this.props;
        const antallTegn = other.value.length;

        return (
            <div className="skjemaelement textarea__container">
                <label className="skjemaelement__label" htmlFor={id}>
                    {label}
                </label>
                <div className="textarea--medMeta__wrapper">
                    <textarea
                        {...other}
                        className={inputCls(textareaClass, feil)}
                        ref={textarea => {
                            this.tekstomrade = textarea;
                        }}
                        id={id}
                        onChange={this.onChange}
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

function Teller(props: TellerProps) {
    return (
        <p className="textarea--medMeta__teller textarea-custom-teller">
            {props.tellerTekst(props.antallTegn, props.maxLength)}
        </p>
    );
}

export default Textarea;
