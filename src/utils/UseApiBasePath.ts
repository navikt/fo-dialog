import { runningOnGithubPages } from '../view/utils/utils';

export function getPathnamePrefix(erVeileder: boolean) {
    return process.env.PUBLIC_URL;
    // if (runningOnGithubPages) return process.env.PUBLIC_URL; // Only used in testing purposes
    // if (erVeileder) {
    //     return '';
    // } else {
    //     return process.env.PUBLIC_URL || '';
    // }
}
