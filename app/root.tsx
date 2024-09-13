import React from 'react';
import { Outlet } from '@remix-run/react';

import navStyles from '@navikt/ds-css/dist/index.css?url';

export default function root() {
    return (
        <html lang="no">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <link rel="apple-touch-icon" sizes="180x180" href="/arbeid/dialog/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/arbeid/dialog/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/arbeid/dialog/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <title>Arbeidsrettet Dialog</title>
                <link href="<%=VITE_DEKORATOR_URL%>/css/client.css" rel="stylesheet" />
            </head>

            <body>
                <div id="decorator-header"></div>
                <div id="pagewrapper" className="pagewrapper" style="height: calc(100vh - 80px)">
                    <main
                        id="maincontent"
                        className="maincontent"
                        role="main"
                        tabIndex="-1"
                        style="outline: none; padding: 0"
                    >
                        <div id="root">
                            <Outlet />
                        </div>
                    </main>
                </div>
                <div id="decorator-footer"></div>
                <script type="module" src="/src/index.tsx"></script>
                <div
                    id="decorator-env"
                    data-src="<%=VITE_DEKORATOR_URL%>/env?feedback=false&chatbot=false&footer=true"
                ></div>
            </body>

            <script src="<%=VITE_DEKORATOR_URL%>/client.js"></script>
        </html>
    );
}
