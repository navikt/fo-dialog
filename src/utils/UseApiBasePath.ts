const tomStrengHvisBaseSlash = (value: string) => {
    return value === '/' ? '' : value;
};
export const pathnamePrefix = tomStrengHvisBaseSlash(import.meta.env.BASE_URL);
// Api url skal være PUBLIC_URL eksternt, tom strent internt
const getApiBasePath = () => {
    const unprocessedPath = import.meta.env.BASE_URL || pathnamePrefix;
    return tomStrengHvisBaseSlash(unprocessedPath);
};
export const apiBasePath = getApiBasePath();
