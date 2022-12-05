export const pathnamePrefix = process.env.PUBLIC_URL;
export const baseApiUrl = process.env.REACT_APP_BASEAPIURL || pathnamePrefix;
export function getPathnamePrefix() {
    return baseApiUrl;
}
