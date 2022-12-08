export const pathnamePrefix = process.env.PUBLIC_URL;
// Api url skal være PUBLIC_URL eksternt, tom strent internt
const getApiBasePath = () => {
    const unprocessedPath = process.env.REACT_APP_BASEAPIURL || pathnamePrefix;
    return unprocessedPath === '/' ? '' : unprocessedPath;
};
export const apiBasePath = getApiBasePath();
