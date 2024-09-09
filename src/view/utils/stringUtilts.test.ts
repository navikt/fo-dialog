import { describe, expect } from 'vitest';
import { cutStringAtLength } from './stringUtils';

describe('cutStringAtLength', () => {
    it('should not have more characters than max', () => {
        expect(cutStringAtLength('too long text', 8)).toBe('too long');
    });

    it('should replace last character with postfix and still not have more characters than max', () => {
        expect(cutStringAtLength('too long text', 8, '...')).toBe('too l...');
    });
});
