import * as process from 'process';

import { runningOnGithubPages, settSammenmedSlasher } from '../view/utils/utils';

export function rndId() {
    const crypto: Crypto = window.crypto;
    let array = new Uint32Array(1);
    crypto.getRandomValues(array);

    return `${Math.floor(array[0] % 100_000_000)}`;
}

export const gotoStartTestPage = (fnr?: string) => {
    console.log('PUBLIC_URL', process.env.PUBLIC_URL);
    if (runningOnGithubPages) {
        window.history.replaceState({}, '', settSammenmedSlasher(process.env.PUBLIC_URL, '#', fnr));
    } else {
        window.history.replaceState({}, '', settSammenmedSlasher(process.env.PUBLIC_URL, fnr));
    }
};
