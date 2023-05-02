import { USE_HASH_ROUTER } from '../constants';

export const stripTrailingSlash = (str: string) => {
    return str.endsWith('/') ? str.substring(0, str.length - 1) : str;
};

export const pathnamePrefix = stripTrailingSlash(import.meta.env.BASE_URL);

const getApiBasePath = () => {
    if (USE_HASH_ROUTER) {
        return '';
    }
    return pathnamePrefix;
};
export const apiBasePath = getApiBasePath();
