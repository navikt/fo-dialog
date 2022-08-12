import nutgaardUseFetch, { Config, FetchResult } from '@nutgaard/use-fetch';

const createCacheKey = (url: string, option?: RequestInit): string => {
    const method = (option && option.method) || 'GET';
    const body = (option && option.body && option.body.toString()) || '';

    const headers = getHeaders(option);
    return [url, method.toUpperCase(), body, headers].join('||');
};

const getHeaders = (option?: RequestInit): string => {
    const allowed = ['Content-Type', 'Nav-Consumer-Id', 'NAV_CSRF_PROTECTION'];

    if (!option || !option.headers) return '';

    const newHeaders = Object.keys(option.headers.keys).filter((key) => allowed.includes(key));

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
