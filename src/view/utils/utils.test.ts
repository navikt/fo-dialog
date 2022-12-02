import { settSammenmedSlasher } from './utils';

describe('settSammenmedSlasher', () => {
    it('skal gi korrekt format', () => {
        expect(settSammenmedSlasher('arbeidsrettet-dialog')).toBe('/arbeidsrettet-dialog');
    });
    it('skal gi korrekt format med pathname og fnr', () => {
        expect(settSammenmedSlasher('arbeidsrettet-dialog', '12345678901')).toBe('/arbeidsrettet-dialog/12345678901');
    });
    it('skal ikke legge til ekstra slash på starten', () => {
        expect(settSammenmedSlasher('/arbeid/dialog', '12345678901')).toBe('/arbeid/dialog/12345678901');
    });
    it('skal fjerne ekstra slasher på starten', () => {
        expect(settSammenmedSlasher('/////////////////////arbeid/dialog', '12345678901')).toBe(
            '/arbeid/dialog/12345678901'
        );
    });
    it('skal gi korrekt format', () => {
        expect(settSammenmedSlasher(undefined, '66612345678')).toBe('/66612345678');
    });
    it('skal ikke skape problemer når ingen er oppgitt', () => {
        expect(settSammenmedSlasher()).toBe('');
    });
    it('skal behandle kun slash som blank', () => {
        expect(settSammenmedSlasher('/', '')).toBe('');
    });
    it('kan kombinere paths med strings', () => {
        expect(settSammenmedSlasher('arbeidsrettet-dialog', 'start/samtale', 'arbeid//dialog')).toBe(
            '/arbeidsrettet-dialog/start/samtale/arbeid/dialog'
        );
    });
});
