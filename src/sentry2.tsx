import * as Sentry from '@sentry/react';
import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType
} from 'react-router-dom';
import { captureConsoleIntegration } from '@sentry/react';

export enum Env {
    Local = 'local',
    Dev = 'dev',
    Prod = 'prod'
}

export const getEnv = (): Env => {
    // TODO: Dette vil ikke virke som internflate
    const { hostname } = window.location;
    if (hostname.includes('dev.nav.no')) return Env.Dev;
    if (hostname.includes('nav.no')) return Env.Prod;
    return Env.Local;
};

Sentry.init({
    dsn: 'https://e1ba5c07ce204508b9fcbe5c64211ed5@sentry.gc.nav.no/173',
    integrations: [
        Sentry.reactRouterV6BrowserTracingIntegration({
            useEffect: React.useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes
        }),
        Sentry.httpClientIntegration({
            failedRequestTargets: [
                /https:\/\/pto\.ekstern\.dev\.nav\.no\/arbeid\/dialog\/(veilarbdialog|veilarboppfolging|veilarbaktivitet|veilarblest)\/*/,
                /https:\/\/nav\.no\/(veilarbdialog|veilarboppfolging|veilarbaktivitet|veilarblest)\/*/
            ]
        }),
        captureConsoleIntegration({
            // array of methods that should be captured
            // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
            levels: ['warn', 'error']
        })
    ],
    tracePropagationTargets: [
        'localhost',
        /https:\/\/nav\.no\/(veilarbdialog|veilarboppfolging|veilarbaktivitet|veilarblest)/,
        /https:\/\/pto\.ekstern\.dev\.nav\.no\/arbeid\/dialog\/(veilarbdialog|veilarboppfolging|veilarbaktivitet|veilarblest)/
    ],
    environment: getEnv(),
    enabled: getEnv() !== Env.Local,
    ignoreErrors: [
        /Ampltidude/
        // /^Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.$/,
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.2,
    // beforeSend: fjernPersonopplysninger,
    release: import.meta.env.VITE_SENTRY_RELEASE
});

export const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);
