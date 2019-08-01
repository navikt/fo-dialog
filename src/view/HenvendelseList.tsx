import { HenvendelseData } from '../utils/typer';
import React, { useEffect, useRef } from 'react';
import { Henvendelse } from './Henvendelse';

import './henvendelseList.less';

interface Props {
    henvendelseDataList: HenvendelseData[];
}

export function HenvendelseList(props: Props) {
    const viewport = useRef<HTMLDivElement>(null);
    const firstRender = useRef<boolean>(true);

    const henvendelser = props.henvendelseDataList;

    const last = henvendelser[henvendelser.length - 1];

    const scrollToBottom = () => {
        if (viewport.current) {
            if (viewport.current.lastChild instanceof Element) {
                viewport.current.lastChild.scrollIntoView({ behavior: firstRender.current ? 'auto' : 'smooth' });
                firstRender.current = false;
            }
        }
        return function cleanup() {
            firstRender.current = true;
        };
    };
    useEffect(scrollToBottom, [viewport, last, firstRender]);

    if (!henvendelser) {
        return null;
    }

    return (
        <div className="henvendelse-list">
            <div className="henvendelse-list__viewport" ref={viewport}>
                {props.henvendelseDataList.map(henvendelse => (
                    <Henvendelse key={henvendelse.id} henvendelseData={henvendelse} />
                ))}
            </div>
        </div>
    );
}
