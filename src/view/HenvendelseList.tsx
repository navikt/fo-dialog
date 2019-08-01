import { DialogData } from '../utils/typer';
import React, { useEffect, useRef } from 'react';
import { Henvendelse } from './Henvendelse';

import './henvendelseList.less';

interface Props {
    dialogData: DialogData;
}

function useScrollToLast(dialogData: DialogData) {
    const previousDialog = useRef('');
    const henvendelseLenge = dialogData.henvendelser.length;

    useEffect(() => {
        const isFirstRender = dialogData.id !== previousDialog.current;
        previousDialog.current = dialogData.id;

        const behavior: ScrollBehavior = isFirstRender ? 'auto' : 'smooth';
        const elem = document.querySelector('.henvendelse-list__henvendelse:last-of-type');
        if (elem !== null) {
            console.log('scroll', behavior);
            elem.scrollIntoView({ block: 'nearest', behavior });
        }
    }, [previousDialog, henvendelseLenge]);
}

export function HenvendelseList(props: Props) {
    useScrollToLast(props.dialogData);

    if (!props.dialogData.henvendelser) {
        return null;
    }
    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport">
                {props.dialogData.henvendelser.map(henvendelse => (
                    <div key={henvendelse.id} className={'henvendelse-list__henvendelse'}>
                        <Henvendelse henvendelseData={henvendelse} />
                    </div>
                ))}
            </div>
        </div>
    );
}
