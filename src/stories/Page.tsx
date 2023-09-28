import React, { useEffect } from 'react';

import '../global.css';

import { Provider } from '../view/Provider';
import StatusAdvarsel from '../view/statusAdvarsel/StatusAdvarsel';
import { UppdateEventHandler } from '../utils/UpdateEvent';
import cx from 'classnames';
import { Routes } from '../routes';
import AppBody from '../view/AppBody';

interface PageProps {
    visAktivitet?: boolean;
    path?: string;
}
const fnr = '1234567890';

// "Forked" from app to avoid add props only used for storybook dx
export const Page: React.FC<PageProps> = (props) => {
    console.log('Page', props);

    useEffect(() => {
        window.history.pushState(undefined, 'unused', props.path);
    }, []);
    const { visAktivitet } = props;
    return (
        <>
            <Provider visAktivitetDefault={visAktivitet} fnr={fnr} erVeileder={!!fnr}>
                <StatusAdvarsel />
                <UppdateEventHandler />
                <div
                    className={cx('flex max-h-screen min-h-screen', {
                        // 'max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)]': erInternFlate,
                        // 'max-h-[calc(100vh-80px)] min-h-[calc(100vh-80px)]': !erInternFlate
                    })}
                >
                    <Routes />
                </div>
            </Provider>
        </>
    );
};
