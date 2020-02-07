import { useFnrContext } from '../view/Provider';

export default function useApiBasePath(): string {
    const fnr = useFnrContext();
    return process.env.PUBLIC_URL && !fnr ? process.env.PUBLIC_URL : '';
}

export function baseApiPath(fnr?: string) {
    return process.env.PUBLIC_URL && !fnr ? process.env.PUBLIC_URL : '';
}
