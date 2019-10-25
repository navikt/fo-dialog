import { formaterDateAndTime, getKlokkeslett, getVarighet } from './Date';

describe('formaterDateAndTime', () => {
    it('skal gi korrekt format', () => {
        expect(formaterDateAndTime('2018-11-21T13:13:20.663+01:00')).toBe('21.11.2018 13:13');
    });
});

describe('getKlokkeslett', () => {
    it('skal returnerere korrekt klokkeslett time < 10', () => {
        const dato = '2019-08-21T08:00:00+02:00';
        expect(getKlokkeslett(dato)).toBe('08:00');
    });

    it('skal returnerere korrekt klokkeslett time >= 10', () => {
        const dato = '2019-08-21T10:00:00+02:00';
        expect(getKlokkeslett(dato)).toBe('10:00');
    });

    it('skal returnerer korrekt klokkeslett minutt', () => {
        const dato = '2019-08-21T10:50:00+02:00';
        expect(getKlokkeslett(dato)).toBe('10:50');
    });

    it('skal returnerer korrekt klokkeslett minutt < 10', () => {
        const dato = '2019-08-21T10:01:00+02:00';
        expect(getKlokkeslett(dato)).toBe('10:01');
    });
});

describe('getVarighet', () => {
    it('skal returnerere korrekt varighet time <= 10', () => {
        const fradato = '2019-08-21T08:00:00+02:00';
        const tildato = '2019-08-21T08:25:00+02:00';

        expect(getVarighet(fradato, tildato)).toBe('0:25');
    });

    it('skal returnerere korrekt varighet min < 10', () => {
        const fradato = '2019-08-21T08:00:00+02:00';
        const tildato = '2019-08-21T09:00:00+02:00';

        expect(getVarighet(fradato, tildato)).toBe('1:00');
    });
});
