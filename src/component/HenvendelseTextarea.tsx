import React from 'react';
import './henvendelseTextarea.less';
import classNames from 'classnames';

type Props = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

function HenvendelseTextarea(props: Props) {
    const { className, ...other } = props;
    const textareaClassName = classNames('autosizing-textarea__textarea', className);

    return (
        <div className="autosizing-textarea">
            <div className="autosizing-textarea__mirror" aria-hidden={true}>
                {props.value}
            </div>
            <textarea className={textareaClassName} {...other} />
        </div>
    );
}

export default HenvendelseTextarea;
