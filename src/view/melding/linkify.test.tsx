import { describe, expect } from 'vitest';

import { splitOnLinks } from './linkify';

describe('linkify.tsx', () => {
    it('should not skip last part', () => {
        expect(splitOnLinks('qwe www.nav.no qwe ')).toStrictEqual([
            { value: 'qwe ', type: 'text' },
            { value: 'www.nav.no', type: 'link' },
            { value: ' qwe ', type: 'text' }
        ]);
    });

    it('should handle with no urls', () => {
        expect(splitOnLinks('Langt avsnitt her')).toStrictEqual([{ value: 'Langt avsnitt her', type: 'text' }]);
    });

    it('should handle text starting with url', () => {
        expect(splitOnLinks('www.nav.no Langt avsnitt her')).toStrictEqual([
            { value: 'www.nav.no', type: 'link' },
            { value: ' Langt avsnitt her', type: 'text' }
        ]);
    });

    it('should handle text ending with url', () => {
        expect(splitOnLinks('Langt avsnitt her www.nav.no')).toStrictEqual([
            { value: 'Langt avsnitt her ', type: 'text' },
            { value: 'www.nav.no', type: 'link' }
        ]);
    });
    it('should handle text with only url', () => {
        expect(splitOnLinks('www.nav.no')).toStrictEqual([{ value: 'www.nav.no', type: 'link' }]);
    });
});
