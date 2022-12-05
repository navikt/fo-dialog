export const pathnamePrefix = process.env.PUBLIC_URL;

// Vi trenger å vite om applikasjonen skal kjøres uten /arbeid/dialog
// Vi antar at alle api-kall skl prefikses med public_url
// Dette er løst ved å sette REACT_APP_BASEAPIURL som overstyrer PUBLIC_URL
// OBS: public_url kan komme fra "homepage" i package.json
export const baseApiUrl = process.env.REACT_APP_BASEAPIURL || pathnamePrefix;
export function getPathnamePrefix() {
    return baseApiUrl === '/' ? '' : baseApiUrl;
}
