import { runningOnGithubPages } from '../view/utils/utils';

export function getPathnamePrefix(erVeileder: boolean) {
    if (runningOnGithubPages) return ''; // Only used in testing purposes
    if (erVeileder) {
        return '';
    } else {
        return process.env.PUBLIC_URL || '';
    }
}
