import { USE_HASH_ROUTER } from '../constants';

export function rndId() {
    const crypto: Crypto = window.crypto;
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    return `${Math.floor(array[0] % 100_000_000)}`;
}

const isNineDigits = (val: string) => /^\d{9}$/.test(val);
export const toggleFnrInUrl = (hashPart: string, fnr: string | undefined) => {
    const parts = hashPart.split('/').slice(1);
    if (fnr && parts[0] === fnr) {
        return '#/' + parts.join('/');
    } else if (fnr && parts[0] !== fnr) {
        return '#/' + [fnr, ...parts].join('/');
    } else if (!fnr && parts.length === 0) {
        return '#/';
    } else if (!fnr && isNineDigits(parts[0].toString())) {
        return '#/' + parts.slice(1).join('/');
    } else {
        return '#/';
    }
};
