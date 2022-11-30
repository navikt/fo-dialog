import { usingHashRouting } from '../view/utils/utils';

const pathPrefix = process.env.PUBLIC_URL;

export function baseApiPath(erVeileder: boolean) {
    if (usingHashRouting) return ''; // Only used in testing purposes
    if (erVeileder) {
        return ''; // veilarbpersonflate -> alle endepunkter starter med /veilarboppfolging/api
    } else {
        return pathPrefix || '';
    }
}
