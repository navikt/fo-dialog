import { getBasenameFromFnrAndPathname } from './utils';

describe('getBasenname', () => {
    it('skal gi korrekt format', () => {
        expect(getBasenameFromFnrAndPathname('arbeidsrettet-dialog')).toBe('arbeidsrettet-dialog');
    });
    it('skal gi korrekt format med pathname og fnr', () => {
        expect(getBasenameFromFnrAndPathname('arbeidsrettet-dialog', '12345678901')).toBe(
            'arbeidsrettet-dialog/12345678901'
        );
    });
    it('skal fjerne slash på starten', () => {
        expect(getBasenameFromFnrAndPathname('/arbeidsrettet-dialog', '12345678901')).toBe(
            'arbeidsrettet-dialog/12345678901'
        );
    });
    it('skal fjerne slash på starten', () => {
        expect(getBasenameFromFnrAndPathname('/////////////////////arbeidsrettet-dialog', '12345678901')).toBe(
            'arbeidsrettet-dialog/12345678901'
        );
    });
    it('skal gi korrekt format', () => {
        expect(getBasenameFromFnrAndPathname(undefined, '66612345678')).toBe('66612345678');
    });
    it('skal ikke skape problemer når ingen er oppgitt', () => {
        expect(getBasenameFromFnrAndPathname()).toBe(undefined);
    });
});
