import { USE_HASH_ROUTER } from '../constants';

const tomStrengHvisBaseSlash = (value: string) => {
    return value === '/' ? '' : value;
};
export const pathnamePrefix = tomStrengHvisBaseSlash(import.meta.env.BASE_URL);

const getApiBasePath = () => {
    if (USE_HASH_ROUTER) {
        return '';
    } // ghpages
    const unprocessedPath = import.meta.env.BASE_URL || pathnamePrefix;
    return tomStrengHvisBaseSlash(unprocessedPath);
};
export const apiBasePath = getApiBasePath();
