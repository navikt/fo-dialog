import cx from 'classnames';
import React, { useEffect } from 'react';

import { erInternFlate } from './constants';
import { UppdateEventHandler } from './utils/UpdateEvent';
import { AppState, Provider } from './view/Provider';
import StatusAdvarsel from './view/statusAdvarsel/StatusAdvarsel';
import { Routes } from './routes';
import { SWRConfig } from 'swr';
import { localStorageProvider } from './utils/appStateUtil';

interface Props {
    fnr?: string;
    enhet?: string;
    visAktivitetDefault?: boolean;
    initialState?: AppState;
}

const App = (props: Props) => {
    const { fnr, visAktivitetDefault } = props;
    return (
        <SWRConfig value={{ provider: localStorageProvider }}>
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
        </SWRConfig>
    );
};

export default App;
