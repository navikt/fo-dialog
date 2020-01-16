import { useEffect } from 'react';

const selectHodefot = () => Array.from(document.querySelectorAll('.hodefot'));

function skjulElementerForMobil() {
    selectHodefot().forEach(el => {
        el.classList.add('hidden-xs');
    });
}

function visElementer() {
    selectHodefot().forEach(el => {
        el.classList.remove('hidden-xs');
    });
}

export function useSkjulHodefotForMobilVisning() {
    useEffect(() => {
        skjulElementerForMobil();
        return () => visElementer();
    }, []);
}
