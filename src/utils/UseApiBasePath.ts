import { USE_HASH_ROUTER } from '../constants';

const stripTrailingSlash = (baseUrl: string) => {
    return baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;
};

export const pathnamePrefix = stripTrailingSlash(import.meta.env.BASE_URL);

const getApiBasePath = () => {
    if (USE_HASH_ROUTER) {
        return '';
    }
    return pathnamePrefix;
};
export const apiBasePath = getApiBasePath();
