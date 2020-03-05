import FetchMock, { Middleware, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';
import dialoger, { lesDialog, opprettEllerOppdaterDialog, setFerdigBehandlet, setVenterPaSvar } from './Dialog';
import bruker from './Bruker';
import oppfolging from './Oppfolging';
import aktiviteter, { getAktivitet } from './Aktivitet';
import { arenaAktiviteter } from './Arena';
import { veilederMe } from './Veileder';

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

// eslint-disable-next-line
function fail() {
    return ResponseUtils.combine(ResponseUtils.statusCode(401), {
        id: '1',
        type: 'random',
        detaljer: 'et object med noe rart'
    });
}

mock.post('/veilarboppfolging/api/oppfolging/settDigital', {});

mock.get('/veilarbdialog/api/dialog', dialoger);

mock.post('/veilarbdialog/api/dialog', ({ body }) => opprettEllerOppdaterDialog(body));

mock.put('/veilarbdialog/api/dialog/:dialogId/les', ({ pathParams }) => lesDialog(pathParams.dialogId));

mock.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/:bool', ({ pathParams }) =>
    setVenterPaSvar(pathParams.dialogId, pathParams.bool === 'true')
);
mock.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/:bool', ({ pathParams }) =>
    setFerdigBehandlet(pathParams.dialogId, pathParams.bool === 'true')
);

mock.get('/veilarboppfolging/api/oppfolging/me', bruker());

mock.get('/veilarboppfolging/api/oppfolging', oppfolging);

mock.get('/veilarbaktivitet/api/aktivitet', aktiviteter);

mock.get('/veilarbaktivitet/api/aktivitet/:aktivitetId', ({ pathParams }) => getAktivitet(pathParams.aktivitetId));

mock.get('/veilarbaktivitet/api/aktivitet/arena', arenaAktiviteter);

mock.get('/api/auth', { remainingSeconds: 60 * 60 });

mock.get('/veilarbveileder/api/veileder/me', veilederMe);
