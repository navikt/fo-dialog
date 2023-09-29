import { ResponseComposition, RestContext, RestRequest, rest } from 'msw';

import aktiviteter from './Aktivitet';
import { arenaAktiviteter } from './Arena';
import bruker from './Bruker';
import {
    harAktivitetFeilerSkruddPa,
    harArenaaktivitetFeilerSkruddPa,
    harCompactModeSkruddPa,
    harDialogFeilerSkruddPa,
    harNivaa4Fieler,
    harNyDialogEllerSendMeldingFeilerSkruddPa
} from './demo/localstorage';
import dialoger, {
    kladder,
    lesDialog,
    opprettEllerOppdaterDialog,
    setFerdigBehandlet,
    setVenterPaSvar
} from './Dialog';
import { harNivaa4Data } from './HarNivaa4';
import oppfolging from './Oppfolging';
import { getSistOppdatert } from './SistOppdatert';
import { veilederMe } from './Veileder';
import { FeatureToggle } from '../featureToggle/const';

const jsonResponse = (response: object | null | boolean | ((req: RestRequest) => object)) => {
    return async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
        if (typeof response === 'function') {
            return res(ctx.json(await response(req)));
        }
        return res(ctx.json(response));
    };
};

const failOrGetResponse = (shouldFail: () => boolean, successFn: (req: RestRequest) => object | undefined) => {
    return async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
        if (shouldFail()) {
            return res(...internalServerError(ctx));
        }
        return res(ctx.json(await successFn(req)));
    };
};

const internalServerError = (ctx: RestContext) => {
    return [
        ctx.status(500, 'Internal server error'),
        ctx.json({
            id: '9170c6534ed5eca272d527cd30c6a458',
            type: 'UKJENT',
            detaljer: {
                detaljertType: 'javax.ws.rs.InternalServerErrorException',
                feilMelding: 'HTTP 500 Internal Server Error',
                stackTrace: 'javax.ws.rs.InternalServerErrorException: HTTP 500 Internal Server Error\r\n\t'
            }
        })
    ];
};

export const handlers = [
    rest.get(
        '/veilarbaktivitet/api/feature',
        jsonResponse({ [FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP]: harCompactModeSkruddPa() })
    ),
    rest.get('/auth/info', jsonResponse({ remainingSeconds: 60 * 60 })),

    // veilarbdialog
    rest.get('/veilarbdialog/api/kladd', jsonResponse(kladder)),
    rest.get('/veilarbdialog/api/dialog', failOrGetResponse(harDialogFeilerSkruddPa, dialoger)),
    rest.put('/veilarbdialog/api/dialog/:dialogId/les', jsonResponse(lesDialog)),
    rest.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/:bool', jsonResponse(setVenterPaSvar)),
    rest.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/:bool', jsonResponse(setFerdigBehandlet)),
    rest.get('/veilarbdialog/api/dialog/sistOppdatert', jsonResponse(getSistOppdatert)),
    rest.post('/veilarbdialog/api/kladd', (_, res, ctx) => res(ctx.status(204))),
    rest.post(
        '/veilarbdialog/api/dialog',
        failOrGetResponse(harNyDialogEllerSendMeldingFeilerSkruddPa, opprettEllerOppdaterDialog)
    ),
    rest.post('/veilarbdialog/api/logger/event', (_, res, ctx) => res(ctx.status(200))),

    // veilarboppfolging
    rest.get('/veilarboppfolging/api/oppfolging/me', jsonResponse(bruker)),
    rest.get('/veilarboppfolging/api/oppfolging', jsonResponse(oppfolging)),
    rest.post('/veilarboppfolging/api/oppfolging/settDigital', jsonResponse({})),

    // veilarbaktivitet
    rest.get(
        '/veilarbaktivitet/api/aktivitet',
        failOrGetResponse(harAktivitetFeilerSkruddPa, () => aktiviteter)
    ),
    rest.get(
        '/veilarbaktivitet/api/arena/tiltak',
        failOrGetResponse(harArenaaktivitetFeilerSkruddPa, () => arenaAktiviteter)
    ),

    // veilarbveileder
    rest.get(`/veilarbveileder/api/veileder/me`, jsonResponse(veilederMe)),

    // veilarbperson
    rest.get(`/veilarbperson/api/person/:fnr/harNivaa4`, failOrGetResponse(harNivaa4Fieler, harNivaa4Data))
];
