import { DialogData, HenvendelseData, NyDialogMeldingData } from '../utils/typer';
import { rndId } from './utils';
import { JSONArray, JSONObject, ResponseData } from 'yet-another-fetch-mock';

const dialoger: DialogData[] & JSONArray = [
    {
        id: '1',
        overskrift: 'Memes',
        sisteTekst: 'Hei. Hva er status her? Har du finnet Kaptain Sabeltann?',
        sisteDato: '2018-01-28T12:48:56.097+01:00',
        opprettetDato: '2018-02-27T12:48:56.081+01:00',
        historisk: false,
        lest: true,
        venterPaSvar: false,
        ferdigBehandlet: false,
        lestAvBrukerTidspunkt: null,
        erLestAvBruker: false,
        aktivitetId: null,
        henvendelser: [
            {
                id: '1',
                dialogId: '1',
                avsender: 'VEILEDER',
                avsenderId: 'Z123456',
                sendt: '2018-02-27T12:48:56.097+01:00',
                lest: true,
                tekst: 'Hei. Hva er status her? Har du finnet Kaptain Sabeltann?'
            },
            {
                id: '2',
                dialogId: '1',
                avsender: 'BRUKER',
                avsenderId: '0102030405',
                sendt: '2018-02-28T12:48:56.097+01:00',
                lest: true,
                tekst: 'Hei. Leter enda på sjøen :)'
            }
        ],
        egenskaper: []
    },
    {
        id: '3',
        overskrift: 'NOT USED',
        sisteTekst:
            'Det er viktig at du gjennomfører denne aktiviteten med NAV. Gjør du ikke det, kan det medføre at stønaden du mottar fra NAV bortfaller for en periode eller stanses. Hvis du ikke kan gjennomføre aktiviteten, ber vi deg ta kontakt med veilederen din så snart som mulig.',
        sisteDato: '2018-11-21T13:13:20.685+01:00',
        opprettetDato: '2018-11-21T13:13:20.663+01:00',
        historisk: false,
        lest: false,
        venterPaSvar: false,
        ferdigBehandlet: true,
        lestAvBrukerTidspunkt: null,
        erLestAvBruker: false,
        aktivitetId: null,
        henvendelser: [
            {
                id: '4',
                dialogId: '3',
                avsender: 'VEILEDER',
                avsenderId: 'Z990286',
                sendt: '2018-11-21T13:13:20.685+01:00',
                lest: true,
                tekst:
                    'Det er viktig at du gjennomfører denne aktiviteten med NAV. Gjør du ikke det, kan det medføre at stønaden du mottar fra NAV bortfaller for en periode eller stanses. Hvis du ikke kan gjennomføre aktiviteten, ber vi deg ta kontakt med veilederen din så snart som mulig.'
            }
        ],
        egenskaper: ['PARAGRAF8']
    },
    {
        id: '2',
        overskrift: 'Du har fått et varsel fra NAV',
        sisteTekst: 'Jeg har ikke hørt noe fra deg i det siste. Har du forlist?\n',
        sisteDato: '2018-02-01T11:52:20.615+01:00',
        opprettetDato: '2018-02-01T11:52:20.535+01:00',
        historisk: false,
        lest: true,
        venterPaSvar: true,
        ferdigBehandlet: true,
        lestAvBrukerTidspunkt: null,
        erLestAvBruker: false,
        aktivitetId: null,
        henvendelser: [
            {
                id: '3',
                dialogId: '2',
                avsender: 'VEILEDER',
                avsenderId: 'Z123456',
                sendt: '2018-02-01T11:52:20.615+01:00',
                lest: true,
                tekst: 'Jeg har ikke hørt noe fra deg i det siste. Har du forlist?\n'
            }
        ],
        egenskaper: ['ESKALERINGSVARSEL']
    },
    {
        id: '4',
        overskrift: 'Automatiske dialoger',
        sisteTekst:
            'Hei!\n' +
            'Du er registrert som arbeidssøker og NAV trenger å bli kjent med ditt behov for hjelp fra oss, slik at vi kan gi deg riktig veiledning.\n' +
            'Hva mener du? Klik her og vurder hva du selv tenker https://behovsvurdering.nav.no\n',
        sisteDato: '2018-01-28T12:48:56.097+01:00',
        opprettetDato: '2018-02-27T12:48:56.081+01:00',
        historisk: false,
        lest: false,
        venterPaSvar: false,
        ferdigBehandlet: true,
        lestAvBrukerTidspunkt: null,
        erLestAvBruker: false,
        aktivitetId: '1',
        henvendelser: [
            {
                id: '4',
                dialogId: '4',
                avsender: 'VEILEDER',
                avsenderId: 'Z999999',
                sendt: '2018-02-27T12:48:56.097+01:00',
                lest: false,
                tekst:
                    'Hei!\n' +
                    'Du er registrert som arbeidssøker og NAV trenger å bli kjent med ditt behov for hjelp fra oss, slik at vi kan gi deg riktig veiledning.\n' +
                    'Hva mener du? Klik her og vurder hva du selv tenker https://behovsvurdering.nav.no\n'
            },
            {
                id: '5',
                dialogId: '4',
                avsender: 'VEILEDER',
                avsenderId: 'Z999999',
                sendt: '2018-02-28T12:48:56.097+01:00',
                lest: false,
                tekst:
                    'Hei!\n' +
                    'Du har svart at du har utfordringer som hindrer deg i å søke eller være i jobb. Vi vil veilede deg videre og trenger derfor å vite litt mer.\n' +
                    'Du kan velge om du vil fortelle om situasjonen din \n' +
                    '- i et møte med veilederen din på NAV-kontoret\n' +
                    '- i en telefonsamtale\n' +
                    '- her i dialogen\n' +
                    'Skriv svaret ditt i feltet under. Hvis du velger "her i dialogen", kan du fortelle mer allerede nå.\n'
            },
            {
                id: '6',
                dialogId: '4',
                avsender: 'VEILEDER',
                avsenderId: 'Z999999',
                sendt: '2018-02-28T12:48:56.097+01:00',
                lest: false,
                tekst:
                    'Hei!\n' +
                    'Du har svart at du trenger mer veiledning nå som retten til sykepenger nærmer seg slutten. Vi vil veilede deg videre og trenger derfor å vite litt mer.\n' +
                    'Du kan velge om du vil fortelle om situasjonen din \n' +
                    '- i et møte med veilederen din på NAV-kontoret\n' +
                    '- i en telefonsamtale\n' +
                    '- her i dialogen\n' +
                    'Skriv svaret ditt i feltet under. Hvis du velger "her i dialogen", kan du fortelle mer allerede nå.\n'
            }
        ],
        egenskaper: []
    }
];

export function lesDialog(dialogId: string): Promise<ResponseData> {
    const dialog = dialoger.find(dialog => dialog.id === dialogId);
    if (dialog) {
        dialog.lest = true;
        return Promise.resolve({ status: 200 });
    }
    return Promise.resolve({ status: 404 });
}

export function opprettEllerOppdaterDialog(update: NyDialogMeldingData): DialogData & JSONObject {
    const dialogId = !update.dialogId || update.dialogId === '' ? rndId() : `${update.dialogId}`;
    const nyHenvendelse: HenvendelseData = {
        id: rndId(),
        dialogId: dialogId,
        avsender: 'BRUKER',
        avsenderId: 'Z123456',
        sendt: new Date().toISOString(),
        lest: true,
        tekst: update.tekst
    };

    const eksisterendeDialog = dialoger.find(dialog => update.dialogId !== undefined && dialog.id === dialogId);

    if (eksisterendeDialog) {
        const oldDialog = eksisterendeDialog;
        oldDialog.sisteTekst = update.tekst;
        oldDialog.sisteDato = nyHenvendelse.sendt;
        oldDialog.henvendelser.push(nyHenvendelse);
        return oldDialog as DialogData & JSONObject;
    } else {
        const nyDialog: DialogData = {
            id: nyHenvendelse.dialogId,
            overskrift:
                update.overskrift === undefined || update.overskrift === null ? rndId().toString() : update.overskrift,
            sisteTekst: update.tekst,
            sisteDato: new Date().toISOString(),
            opprettetDato: new Date().toISOString(),
            historisk: false,
            lest: true,
            venterPaSvar: true,
            ferdigBehandlet: false,
            lestAvBrukerTidspunkt: null,
            erLestAvBruker: false,
            aktivitetId: null,
            henvendelser: [nyHenvendelse],
            egenskaper: []
        };
        dialoger.push(nyDialog);
        return nyDialog as DialogData & JSONObject;
    }
}

export default dialoger;
