import { toggleFnrInUrl } from './Utils';

describe('Goes to correct url in test app', () => {
    const fnr = '123456789';
    it('Should toggle on or off fnr correctly when redirecting', () => {
        expect(toggleFnrInUrl('#/123456789', fnr)).toBe('#/123456789');
        expect(toggleFnrInUrl('#/123456789', undefined)).toBe('#/');
        expect(toggleFnrInUrl('#/123456789/123', fnr)).toBe('#/123456789/123');
        expect(toggleFnrInUrl('#/123456789/123', undefined)).toBe('#/123');
    });
});
