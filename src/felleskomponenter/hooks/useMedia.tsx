import { useState, useEffect } from 'react';

export function useMedia(query: string) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const eventListener = () => {
            setMatches(media.matches);
        };

        media.addEventListener('change', eventListener);
        return () => media.removeEventListener('change', eventListener);
    }, [query]);

    return matches;
}
