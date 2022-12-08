import fs from 'fs';

import { getBasename } from '../view/utils/utils';
import { apiBasePath, pathnamePrefix } from './UseApiBasePath';

const loadEnv = (path: string) => {
    const mockEnv = fs
        .readFileSync(path, 'utf-8')
        .split('\n')
        .reduce((acc, line) => {
            const [key, val] = line.split('=');
            return {
                ...acc,
                [key]: val
            };
        }, {});
    process.env = {
        PUBLIC_URL: '/arbeid/dialog',
        ...mockEnv
    };
};

describe('base', () => {
    const oldEnv = process.env;
    const fnr = '1234567890';

    afterEach(() => {
        process.env = oldEnv;
        jest.resetModules();
    });

    it('ekstern dev api-url should be PUBLIC_URL', () => {
        loadEnv('./nais/.env.dev.ekstern');
        const { pathnamePrefix, apiBasePath } = require('./UseApiBasePath');
        const { getBasename } = require('../view/utils/utils');
        expect(pathnamePrefix).toBe('/arbeid/dialog');
        expect(apiBasePath).toBe('/arbeid/dialog');
        expect(getBasename()).toBe('/arbeid/dialog');
    });

    it('intern dev api-url should be empty string', () => {
        loadEnv('./nais/.env.dev.intern');
        const { pathnamePrefix, apiBasePath } = require('./UseApiBasePath');
        const { getBasename } = require('../view/utils/utils');
        expect(pathnamePrefix).toBe('/arbeid/dialog');
        expect(apiBasePath).toBe('');
        expect(getBasename(fnr)).toBe(`/${fnr}`);
    });

    it('ekstern prod api-url should be PUBLIC_URL', () => {
        loadEnv('./nais/.env.prod.ekstern');
        const { pathnamePrefix, apiBasePath } = require('./UseApiBasePath');
        const { getBasename } = require('../view/utils/utils');
        expect(pathnamePrefix).toBe('/arbeid/dialog');
        expect(apiBasePath).toBe('/arbeid/dialog');
        expect(getBasename()).toBe('/arbeid/dialog');
    });

    it('intern prod api-url should be empty string', () => {
        loadEnv('./nais/.env.prod.intern');
        const { pathnamePrefix, apiBasePath } = require('./UseApiBasePath');
        const { getBasename } = require('../view/utils/utils');
        expect(pathnamePrefix).toBe('/arbeid/dialog');
        expect(apiBasePath).toBe('');
        expect(getBasename(fnr)).toBe(`/${fnr}`);
    });

    it('gh-pages api-url should be empty string', () => {
        loadEnv('./nais/.env.github.pages');
        const { pathnamePrefix, apiBasePath } = require('./UseApiBasePath');
        expect(pathnamePrefix).toBe('/arbeidsrettet-dialog');
        expect(apiBasePath).toBe('/arbeidsrettet-dialog');
    });
});
