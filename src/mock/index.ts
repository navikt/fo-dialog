import '@navikt/ds-css';

import FetchMock, { Middleware, MiddlewareUtils, ResponseData, ResponseUtils } from 'yet-another-fetch-mock';

import { apiBasePath } from '../utils/UseApiBasePath';
import aktiviteter from './Aktivitet';
import { arenaAktiviteter } from './Arena';
import bruker from './Bruker';
import {
    getFailureRate,
    harAktivitetFeilerSkruddPa,
    harArenaaktivitetFeilerSkruddPa,
    harDialogFeilerSkruddPa,
    harNivaa4Fieler,
    harNyDialogEllerSendMeldingFeilerSkruddPa
} from './demo/sessionstorage';
import dialoger, {
    kladder,
    lesDialog,
    oppdaterKladd,
    opprettEllerOppdaterDialog,
    setFerdigBehandlet,
    setVenterPaSvar
} from './Dialog';
import { harNivaa4Data } from './HarNivaa4';
import oppfolging from './Oppfolging';
import { getSistOppdatert } from './SistOppdatert';
import { veilederMe } from './Veileder';

const apiBase = apiBasePath;
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

const internalServerError: ResponseData = {
    status: 500,
    body: {
        id: '9170c6534ed5eca272d527cd30c6a458',
        type: 'UKJENT',
        detaljer: {
            detaljertType: 'javax.ws.rs.InternalServerErrorException',
            feilMelding: 'HTTP 500 Internal Server Error',
            stackTrace: 'javax.ws.rs.InternalServerErrorException: HTTP 500 Internal Server Error\r\n\t'
        }
    }
};

const mock = FetchMock.configure({
    enableFallback: false, // default: true
    middleware: MiddlewareUtils.combine(
        loggingMiddleware,
        MiddlewareUtils.delayMiddleware(1000),
        MiddlewareUtils.failurerateMiddleware(getFailureRate() / 100.0, internalServerError)
    )
});

// eslint-disable-next-line
function fail() {
    return ResponseUtils.combine(ResponseUtils.statusCode(401), {
        id: '1',
        type: 'random',
        detaljer: 'et object med noe rart'
    });
}
mock.get(`${apiBase}/veilarbdialog/api/kladd`, kladder);
mock.get(`${apiBase}/veilarbdialog/api/dialog`, harDialogFeilerSkruddPa() ? fail() : dialoger);
mock.put(`${apiBase}/veilarbdialog/api/dialog/:dialogId/les`, ({ pathParams }) => lesDialog(pathParams.dialogId));
mock.put(`${apiBase}/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/:bool`, ({ pathParams }) =>
    setVenterPaSvar(pathParams.dialogId, pathParams.bool === 'true')
);
mock.put(`${apiBase}/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/:bool`, ({ pathParams }) =>
    setFerdigBehandlet(pathParams.dialogId, pathParams.bool === 'true')
);
mock.get(`${apiBase}/veilarbdialog/api/dialog/sistOppdatert`, getSistOppdatert());
mock.post(
    `${apiBase}/veilarbdialog/api/kladd`,
    ResponseUtils.combine(ResponseUtils.statusCode(204), ({ body }) => oppdaterKladd(body))
);
mock.post(
    `${apiBase}/veilarbdialog/api/dialog`,
    harNyDialogEllerSendMeldingFeilerSkruddPa() ? fail() : ({ body }) => opprettEllerOppdaterDialog(body)
);
mock.post(`${apiBase}/veilarbdialog/api/logger/event`, ({ body }) => {
    const event = body;
    console.log('Event', event.name, 'Fields:', event.fields, 'Tags:', event.tags);
    return {};
});

mock.get(`${apiBase}/veilarboppfolging/api/oppfolging/me`, bruker());
mock.get(`${apiBase}/veilarboppfolging/api/oppfolging`, oppfolging);
mock.get(`${apiBase}/veilarbaktivitet/api/aktivitet`, harAktivitetFeilerSkruddPa() ? fail() : aktiviteter);
mock.get(`${apiBase}/veilarbaktivitet/api/arena/tiltak`, harArenaaktivitetFeilerSkruddPa() ? fail() : arenaAktiviteter);
mock.get(`/veilarbveileder/api/veileder/me`, veilederMe);
mock.get(
    `/veilarbperson/api/person/:fnr/harNivaa4`,
    harNivaa4Fieler() ? fail() : ({ pathParams }) => harNivaa4Data(pathParams.fnr)
);
mock.get(`${apiBase}/auth/info`, { remainingSeconds: 60 * 60 });
mock.post(`${apiBase}/veilarboppfolging/api/oppfolging/settDigital`, {});
