import { getPathnamePrefix } from '../utils/UseApiBasePath';
import { runningOnGithubPages, settSammenmedSlasher } from '../view/utils/utils';

export function rndId() {
    const crypto: Crypto = window.crypto;
    let array = new Uint32Array(1);
    crypto.getRandomValues(array);

    return `${Math.floor(array[0] % 100_000_000)}`;
}

export const gotoStartTestPage = (fnr?: string) => {
    const pathnamePrefix = getPathnamePrefix();
    if (runningOnGithubPages) {
        window.history.replaceState({}, '', settSammenmedSlasher(pathnamePrefix, '#', fnr));
    } else {
        window.history.replaceState({}, '', settSammenmedSlasher(pathnamePrefix, fnr));
    }
};
