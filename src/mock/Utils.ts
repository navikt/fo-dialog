import * as process from 'process';

import { runningOnGithubPages, settSammenmedSlasher } from '../view/utils/utils';

export function rndId() {
    return `${Math.floor(Math.random() * 100_000_000)}`;
}

export const gotoStartTestPage = (fnr?: string) => {
    console.log('PUBLIC_URL', process.env.PUBLIC_URL);
    if (runningOnGithubPages) {
        window.history.replaceState({}, '', settSammenmedSlasher(process.env.PUBLIC_URL, '#', fnr));
    } else {
        window.history.replaceState({}, '', settSammenmedSlasher(process.env.PUBLIC_URL, fnr));
    }
};
