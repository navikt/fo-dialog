import nutgaardUseFetch, { Config, FetchResult } from '@nutgaard/use-fetch';

const createCacheKey = (url: string, option?: RequestInit): string => {
    const method = (option && option.method) || 'GET';
    const body = (option && option.body && option.body.toString()) || '';

    const headers = getHeaders(option);
    return [url, method.toUpperCase(), body, headers].join('||');
};

export const getHeaders = (option?: RequestInit): string => {
    const allowed = ['Content-Type', 'Nav-Consumer-Id', 'NAV_CSRF_PROTECTION'];

    if (!option || !option.headers) return '';

    const newHeaders = Object.fromEntries(Object.entries(option.headers).filter((key) => allowed.includes(key[0])));

    return JSON.stringify(newHeaders);
};

const useFetch = <TYPE>(
    url: string,
    option?: RequestInit,
    config: Config = { lazy: false, cacheKey: undefined }
): FetchResult<TYPE> => {
    if (!config.cacheKey) {
        config.cacheKey = createCacheKey(url, option);
    }

    return nutgaardUseFetch(url, option, config);
};

export default useFetch;
