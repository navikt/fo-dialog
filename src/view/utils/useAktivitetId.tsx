import { useLocation } from 'react-router';

export function useAktivitetId() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    return query.get('aktivitetId') || undefined;
}
