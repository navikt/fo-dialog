import { HenvendelseData } from '../utils/typer';
import React from 'react';
import { Henvendelse } from './Henvendelse';

import './henvendelseList.less';

interface Props {
    henvendelseDataList: HenvendelseData[];
}

export function HenvendelseList(props: Props) {
    return (
        <>
            {props.henvendelseDataList === undefined ? null : (
                <div className="henvendelse-list">
                    {props.henvendelseDataList.map(henvendelse => (
                        <div key={henvendelse.id}>
                            <Henvendelse henvendelseData={henvendelse} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
