import { useLocation } from 'react-router';
import queryString from 'query-string';

function getFirst(maybeArray: string | string[]): string {
    if (Array.isArray(maybeArray)) {
        return maybeArray[0];
    }
    return maybeArray;
}

export function useAktivitetId() {
    const location = useLocation();
    const { aktivitetId } = queryString.parse(location.search);
    return !!aktivitetId ? getFirst(aktivitetId) : undefined;
}
