import { useFnrContext } from '../view/Provider';
import { usingHashRouting } from '../view/utils/utils';

export default function useApiBasePath(): string {
    const fnr = useFnrContext();
    const erVeileder = !!fnr;
    return baseApiPath(erVeileder);
}

const pathPrefix = process.env.PUBLIC_URL;

export function baseApiPath(erVeileder: boolean) {
    if (usingHashRouting) return ''; // Only used in testing purposes
    if (erVeileder) {
        return ''; // veilarbpersonflate -> alle endepunkter starter med /veilarboppfolging/api
    } else {
        return pathPrefix || '';
    }
}
