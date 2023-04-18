const tomStrengHvisBaseSlash = (value: string) => {
    return value === '/' ? '' : value;
};
export const pathnamePrefix = tomStrengHvisBaseSlash(import.meta.env.BASE);
// Api url skal være PUBLIC_URL eksternt, tom strent internt
const getApiBasePath = () => {
    const unprocessedPath = process.env.REACT_APP_BASEAPIURL || pathnamePrefix;
    return tomStrengHvisBaseSlash(unprocessedPath);
};
export const apiBasePath = getApiBasePath();
