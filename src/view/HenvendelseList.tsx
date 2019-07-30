import { HenvendelseData } from '../utils/typer';
import React, { useEffect, useRef, useState } from 'react';
import { Henvendelse } from './Henvendelse';

import './henvendelseList.less';

interface Props {
    henvendelseDataList: HenvendelseData[];
}

export function HenvendelseList(props: Props) {
    const endOfMessages = useRef<HTMLDivElement>(null);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const scrolllToBottom = () => {
        if (endOfMessages.current !== null) {
            endOfMessages.current.scrollIntoView({ behavior: isFirstRender ? 'auto' : 'smooth' });
            setIsFirstRender(false);
        }
    };
    useEffect(scrolllToBottom, [props.henvendelseDataList.map(data => data.id)]);

    if (!props.henvendelseDataList) {
        return null;
    }
    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport">
                {props.henvendelseDataList.map(henvendelse => (
                    <div key={henvendelse.id} className="henvendelse-list__henvendelse">
                        <Henvendelse henvendelseData={henvendelse} />
                    </div>
                ))}
                <div className="lastScroll" ref={endOfMessages} />
            </div>
        </div>
    );
}
