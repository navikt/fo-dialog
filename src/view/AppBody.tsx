import React from 'react';
import { Outlet, useMatches } from 'react-router';

import DialogOversikt from './dialogliste/DialogOversikt';
import { EventHandler } from './EventHandler';
import { RouteIds } from '../routing/routes';
import classNames from 'classnames';
import StatusAdvarsel from './statusAdvarsel/StatusAdvarsel';
import DialogHeaderFeil from './dialog/DialogHeaderFeil';

const AppBody = () => {
    const erDialogRoute = useMatches().some((match) => match.id === RouteIds.Dialog);

    return (
        <>
            <DialogOversikt />
            <div
                className={classNames('flex md:flex-1 flex-col', {
                    'flex-1': erDialogRoute // Når dialoger vises skal boks med meldinger fylle mest mulig
                })}
            >
                <StatusAdvarsel />
                <DialogHeaderFeil />
                <Outlet />
            </div>
            <EventHandler />
        </>
    );
};

export default AppBody;
