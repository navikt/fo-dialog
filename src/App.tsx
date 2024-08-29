import cx from 'classnames';
import React from 'react';

import { erInternFlate } from './constants';
import { UppdateEventHandler } from './utils/UpdateEvent';
import { Provider } from './view/Provider';
import StatusAdvarsel from './view/statusAdvarsel/StatusAdvarsel';
import { Routes } from './routes';
import { useShallow } from 'zustand/react/shallow';
import { useFnrStore } from './fnrStore';

interface Props {
    enhet?: string;
    visAktivitetDefault?: boolean;
}

const App = (props: Props) => {
    const { visAktivitetDefault } = props;
    const fnr = useFnrStore(useShallow((state) => state.fnr));
    return (
        <Provider visAktivitetDefault={visAktivitetDefault} fnr={fnr} erVeileder={!!fnr}>
            <StatusAdvarsel />
            <UppdateEventHandler />
            <div
                className={cx('flex', {
                    'max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)]': erInternFlate,
                    'max-h-[calc(100vh-80px)] min-h-[calc(100vh-80px)]': !erInternFlate
                })}
            >
                <Routes />
            </div>
        </Provider>
    );
};

export default App;
