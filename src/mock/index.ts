import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import dialoger, { lesDialog, opprettEllerOppdaterDialog, setFerdigBehandlet, setVenterPaSvar } from './dialog';
import bruker from './bruker';
import oppfolging from './oppfolging';

const loggingMiddleware: Middleware = (request, response) => {
    // tslint:disable
    console.groupCollapsed(`${request.method} ${request.url}`);
    console.groupCollapsed('config');
    console.log('queryParams', request.queryParams);
    console.log('pathParams', request.pathParams);
    console.log('body', request.body);
    console.groupEnd();

    try {
        console.log('response', JSON.parse(response.body));
    } catch (e) {
        console.log('response', response);
    }

    console.groupEnd();
    // tslint:enable
    return response;
};

const mock = FetchMock.configure({
    enableFallback: false, // default: true
    middleware: MiddlewareUtils.combine(loggingMiddleware, MiddlewareUtils.delayMiddleware(1000))
});

mock.get('/veilarbdialog/api/dialog', dialoger);

mock.post('/veilarbdialog/api/dialog/ny', ({ body }) => opprettEllerOppdaterDialog(body));

mock.put('/veilarbdialog/api/dialog/lest', ({ body }) => lesDialog(body.dialogId));

mock.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/:bool', ({ pathParams }) =>
    setVenterPaSvar(pathParams.dialogId, pathParams.bool === 'true')
);
mock.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/:bool', ({ pathParams }) =>
    setFerdigBehandlet(pathParams.dialogId, pathParams.bool === 'true')
);

mock.get('/veilarboppfolging/api/oppfolging/me', bruker);

mock.get('/veilarboppfolging/api/oppfolging', oppfolging);
