import { describe } from 'vitest';
import { erNyere } from './DialogListe';

describe('erNyere', () => {
    it('skal håndtere når all tid er i zulu', () => {
        const gammelTid = '2024-09-09T08:00:30.171+00:00';
        const nyereTid = '2024-09-09T08:00:31.171+00:00';
        const dialoger = [nyereTid, gammelTid];
        expect(dialoger.sort((a, b) => erNyere(a, b))).toStrictEqual([nyereTid, gammelTid]);
    });

    it('skal funke når input har tidssoner', () => {
        const gammelTid = '2024-09-09T08:00:30.171+02:00';
        const nyereTid = '2024-09-09T08:00:31.171+02:00';
        const dialoger = [nyereTid, gammelTid];
        expect(dialoger.sort((a, b) => erNyere(a, b))).toStrictEqual([nyereTid, gammelTid]);
    });

    it('skal funke når input har forskjellige tidssoner', () => {
        const gammelTid = '2024-09-09T10:00:30.171+02:00';
        const nyereTid = '2024-09-09T08:00:31.171+00:00';
        const dialoger = [nyereTid, gammelTid];
        expect(dialoger.sort((a, b) => erNyere(a, b))).toStrictEqual([nyereTid, gammelTid]);
    });

    it('null skal være først', () => {
        const gammelTid = '2024-09-09T10:00:30.171+02:00';
        const nullTid = null;
        const dialoger = [nullTid, gammelTid];
        expect(dialoger.sort((a, b) => erNyere(a, b))).toStrictEqual([nullTid, gammelTid]);
    });

    it('skal tåle null som argumenter', () => {
        const nullTid = null;
        const dialoger = [nullTid, nullTid];
        expect(dialoger.sort((a, b) => erNyere(a, b))).toStrictEqual([nullTid, nullTid]);
    });
});
